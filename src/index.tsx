import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import "./core/styles/index.scss";
import { Provider } from "react-redux";
import store from "@app/store";
import { SnackbarProvider } from "notistack";
import { HelmetProvider } from "react-helmet-async";

// import { ThemeProvider } from "@material-ui/core";
// import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

// const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </SnackbarProvider>
    </Provider>
    {/* </ThemeProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
