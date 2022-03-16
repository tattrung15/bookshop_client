import { Container, Grid, Paper } from "@material-ui/core";
import { Route, Routes } from "react-router-dom";
import AppBarDrawer from "@app/components/app-bar-drawer";
import { useStyles } from "./make-style";

function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBarDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Routes>
            <Route
              index
              element={
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
              }
            />
            {/* <Route path="/admin/users" exact>
              <Container maxWidth="xl" className={classes.container}>
                <ListUserComponent />
              </Container>
            </Route>
            <Route path="/admin/categories" exact>
              <Container maxWidth="xl" className={classes.container}>
                <CategoriesManagement />
              </Container>
            </Route>
            <Route path="/admin/products" exact>
              <Container maxWidth="xl" className={classes.container}>
                <ProductManagement />
              </Container>
            </Route>
            <Route path="/admin/product-images" exact>
              <Container maxWidth="xl" className={classes.container}>
                <ProductImageManagement />
              </Container>
            </Route>
            <Route path="/admin/sale-orders" exact>
              <Container maxWidth="xl" className={classes.container}>
                <SaleOrderManagement />
              </Container>
            </Route> */}
            {/* <Route path="*">
              <NotFound />
            </Route> */}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
