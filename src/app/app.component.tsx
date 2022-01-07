import { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import HttpService from "@core/services/http/http.service";
import { takeUntil } from "rxjs";
import {
  Backdrop,
  CircularProgress,
  Button,
  DialogContent,
  Dialog,
} from "@mui/material";

import "./styles/app.scss";
import "./app.component.scss";

import useDestroy from "@core/hooks/use-destroy.hook";

import AppBar from "./components/app-bar";

import { routes } from "./app.routing";
import { guardRoutes } from "@core/helpers/components.helper";
import { Role } from "./shared/types/user.type";

function App() {
  const { destroy$ } = useDestroy();
  const [openBackdop, setOpenBackdrop] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string>("");

  const handleClose = () => {
    setOpenDialog(false);
  };

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
  }, [destroy$]);

  return (
    <div>
      <Router>
        <AppBar />
        <Routes>
          {guardRoutes(routes, Role.MEMBER, {
            roles: [Role.MEMBER],
            redirect: "/auth/login",
          })}
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
          <div className="app-dialog-btn-close text-center mt-4 mb-0">
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
