import { Container, Grid, Paper } from "@material-ui/core";
import { useStyles } from "./make-style";

function RecentOrderManagement() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {/* <Orders /> */}
            <h1>Test</h1>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RecentOrderManagement;
