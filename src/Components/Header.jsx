import {
  AppBar,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../Config/CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSideBar from "./UserSideBar";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 35,
    cursor: "pointer",
  },
  toolbar: {
    backgroundColor: "#14161a",
  },
}));
const Header = () => {
  const { currency, setCurrency ,user } = CryptoState();
  const classes = useStyles();
  const Navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar className={classes.toolbar} position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" onClick={()=>Navigate("/")} className={classes.title}>
              Tanz Crypto Tracker
            </Typography>
            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: 100,
                marginRight: 10,
                color: "white",
                height: 40,
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="AUD">AUD</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
              <MenuItem value="SGD">SGD</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
              <MenuItem value="CNY">CNY</MenuItem>
              
            </Select>
           {user?<UserSideBar/>: <AuthModal/>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
