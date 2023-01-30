import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Coin from "./Pages/Coin";
import Home from "./Pages/Home";
import { makeStyles } from "@material-ui/core";
import Alert from "./Components/Alert";

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
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/coins/:id" element={<Coin />} />
      </Routes>
      <Alert/>
    </div>   
  );
}

export default App;
