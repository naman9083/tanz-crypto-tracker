import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";

import { CircularProgress, makeStyles } from "@material-ui/core";
import Alert from "./Components/Alert";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./Pages/Home"));
const CoinPage = lazy(() => import("./Pages/Coin"));

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header />
        <Suspense
          fallback={
            <div>
              <CircularProgress
                color="secondary"
                style={{ position: "absolute", top: "50%", left: "50%" }}
              />
            </div>
          }
        >
      <Routes>

          <Route path="/" exact element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
        </Suspense>
      <Alert />
    </div>
  );
}

export default App;
