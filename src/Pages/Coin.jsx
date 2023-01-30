import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../Config/api";
import { CryptoState } from "../Config/CryptoContext";
import HTMLReactParser from "html-react-parser";
import { doc, onSnapshot, setDoc } from "@firebase/firestore";
import { db } from "../Firebase";
const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, watchList, setAlert, setWatchList } =
    CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const inWatchlist = watchList?.includes(coin?.id);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchList(coin.data().coins);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user, setWatchList]);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchList ? [...watchList, coin?.id] : [coin?.id],
      });
      setAlert({
        type: "success",
        message: `${coin.name} added to watchlist`,
        open: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message,
        open: true,
      });
    }
  };
  const removeFromWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((watch) => watch !== coin?.id),
        },
        { merge: true }
      );
      setAlert({
        type: "success",
        message: `${coin.name} removed from watchlist`,
        open: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message,
        open: true,
      });
    }
  };
  const classes = useStyles();
  if (!coin)
    return (
      <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
    );
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle2" className={classes.description}>
          {HTMLReactParser(coin?.description.en.split(". ")[0])}
          {". "}

          {HTMLReactParser(coin?.description.en.split(". ")[1])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Monserrat",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              &nbsp;&nbsp;
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Monserrat",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              &nbsp;&nbsp;{symbol}&nbsp;
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Monserrat",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              &nbsp;&nbsp;{symbol}&nbsp;
              {coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}
              &nbsp;M
            </Typography>
          </span>
          {user && (
            <Button
              varient="outlined"
              style={{
                backgroundColor: inWatchlist ? "#ff0000" : "Gold",
                width: "100%",
                height: 40,
                fontWeight: "bold",
              }}
              onClick={
                inWatchlist ?  removeFromWatchList :addToWatchlist 
              }
            >
              {inWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}{" "}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coin;
