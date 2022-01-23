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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import "./styles/app.scss";
import "./app.component.scss";

import useDestroy from "@core/hooks/use-destroy.hook";

import AppBar from "./components/app-bar";

import { routes } from "./app.routing";
import { guardRoutes } from "@core/helpers/components.helper";
import { Role } from "./shared/types/user.type";

import { DeliveryEpic } from "./store/delivery";
import { GlobalState } from "./store";
import SignIn from "./pages/sign-in";
import NotFound from "./pages/not-found/not-found.page";

function App() {
  const dispatch = useDispatch();
  const { destroy$ } = useDestroy();
  const [openBackdop, setOpenBackdrop] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string>("");

  const { isDeliveryLoading, isDeliveryError } = useSelector(selectDelivery);
  const { role } = useSelector(selectAuth);

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(DeliveryEpic.fetchDelivery({ destroy$ }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    HttpService.onError$.subscribe((ajaxResponse) => {
      setOpenDialog(true);
      setDialogContent(ajaxResponse?.response?.message);
    });

    HttpService.isRequesting$.pipe(takeUntil(destroy$)).subscribe((value) => {
      if (value) {
        setOpenBackdrop(true);
      } else {
        setOpenBackdrop(false);
      }
    });

    if (isDeliveryLoading) {
      setOpenBackdrop(true);
    } else {
      setOpenBackdrop(false);
    }

    if (isDeliveryError) {
      setOpenDialog(true);
      setDialogContent("Cannot fetch data, please try again...");
    }
  }, [destroy$, isDeliveryError, isDeliveryLoading]);

  return (
    <div>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          {guardRoutes(routes, role, {
            roles: [Role.MEMBER],
            redirect: "/login",
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      {/* Show if network requesting */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdop}
      >
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
          {dialogContent}
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
const selectAuth = (state: GlobalState) => state.auth;

export default App;
