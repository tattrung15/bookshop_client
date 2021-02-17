import React from "react";

import { Button, Icon } from "@material-ui/core";

import "./notfound.css";

function NotFound() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Button
          size="large"
          variant="contained"
          color="primary"
          href="/"
          startIcon={<Icon className="fa fa-home" />}
        >
          Go To Homepage
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
