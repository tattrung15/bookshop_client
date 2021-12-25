import { useState } from "react";
import HttpService from "@core/services/http/http.service";
import { takeUntil } from "rxjs";
import {
  Backdrop,
  CircularProgress,
  Button,
  DialogContent,
  Dialog,
} from "@mui/material";
import { useLayoutEffect } from "react";
import useDestroy from "@core/hooks/use-destroy.hook";
import "./app.component.scss";

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
      <h1 className="text-3xl font-bold underline bg-red-400">Hello world!</h1>

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
