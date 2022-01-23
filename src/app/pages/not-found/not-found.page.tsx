import { Button, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function NotFound() {
  const navigate = useNavigate();

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
          className="bs-btn bs-btn-primary"
          size="large"
          variant="contained"
          startIcon={<Icon className="fa fa-home" />}
          onClick={() => navigate("/")}
        >
          Go To Homepage
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
