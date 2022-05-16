import { useState, useLayoutEffect, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HttpService from "@core/services/http/http.service";
import { takeUntil } from "rxjs";
import {
  Backdrop,
  CircularProgress,
  Button,
  DialogContent,
  Dialog,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import "./styles/app.scss";
import "./app.component.scss";
import useDestroy from "@core/hooks/use-destroy.hook";
import { routes } from "./app.routing";
import { guardRoutes } from "@core/helpers/components.helper";
import { Role } from "./shared/types/user.type";
import { DeliveryEpic } from "./store/delivery";
import { GlobalState } from "./store";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import NotFound from "./pages/not-found";
import AuthService from "./services/http/auth.service";
import useObservable from "@core/hooks/use-observable.hook";
import StorageService from "@core/services/storage";
import { storeUser } from "./store/auth/auth.action";
import { User } from "./models/user.model";
import { useStyles } from "./app.make-style";
import RoleService from "./services/role.service";
import { fetchCart } from "./store/cart/cart.epic";

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { destroy$ } = useDestroy();
  const { subscribeOnce } = useObservable();
  const [openBackdop, setOpenBackdrop] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string>("");

  const { isDeliveryLoading, isDeliveryError } = useSelector(selectDelivery);
  const { isCartLoading, isCartError } = useSelector(selectCart);

  const role = RoleService.getRole();

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(DeliveryEpic.fetchDelivery({ destroy$ }));

    const token = HttpService.getAccessToken() || "";

    subscribeOnce(AuthService.validate(token), (response) => {
      const role = response.result.data.user.role;

      dispatch(storeUser(new User(response.result.data.user)));
      StorageService.set("access_token", response.result.data.jwt);
      StorageService.set("role", role);

      if (role === Role.MEMBER) {
        dispatch(fetchCart({ destroy$ }));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    HttpService.onError$.subscribe((ajaxResponse) => {
      if (!["/"].includes(window.location.pathname)) {
        const connectErrorMsg = "Cannot fetch data, please try again...";
        const msgResponse = ajaxResponse?.response?.message ?? connectErrorMsg;

        if (!msgResponse.includes("JWT")) {
          setOpenDialog(true);
          setDialogContent(msgResponse);
        }
      }
    });

    HttpService.isRequesting$.pipe(takeUntil(destroy$)).subscribe((value) => {
      if (value) {
        setOpenBackdrop(true);
      } else {
        setOpenBackdrop(false);
      }
    });

    if (isDeliveryLoading || isCartLoading) {
      setOpenBackdrop(true);
    } else {
      setOpenBackdrop(false);
    }

    if (isDeliveryError || isCartError) {
      setOpenDialog(true);
      setDialogContent("Cannot fetch data, please try again...");
    }
  }, [
    destroy$,
    isDeliveryError,
    isDeliveryLoading,
    isCartError,
    isCartLoading,
  ]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {guardRoutes(routes, role, {
            roles: [Role.MEMBER],
            redirect: "/login",
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      {/* Show if network requesting */}
      <Backdrop className={classes.backdrop} open={openBackdop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Show if network request has errors */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div
            style={{
              textAlign: "center",
            }}
          >
            {dialogContent}
          </div>
          <div className="app-dialog-btn-close">
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const selectDelivery = (state: GlobalState) => state.delivery;
const selectCart = (state: GlobalState) => state.cart;

export default App;
