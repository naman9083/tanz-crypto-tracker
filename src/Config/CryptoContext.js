import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { CoinList } from "./api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchList, setWatchList] = useState([]);
  const [pic, setPic] = useState("");
  const [progress, setProgress] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    switch (currency) {
      case "INR":
        setSymbol("₹");
        break;
      case "USD":
        setSymbol("$");
        break;
      case "EUR":
        setSymbol("€");
        break;
      case "JPY":
        setSymbol("¥");
        break;
      case "GBP":
        setSymbol("£");
        break;
      case "AUD":
        setSymbol("A$");
        break;
      case "CAD":
        setSymbol("C$");
        break;
      case "CHF":
        setSymbol("Fr");
        break;
      case "CNY":
        setSymbol("¥");
        break;
      case "HKD":
        setSymbol("HK$");
        break;
      case "NZD":
        setSymbol("NZ$");
        break;
      case "SEK":
        setSymbol("kr");
        break;
      case "SGD":
        setSymbol("S$");
        break;
      default:
        setSymbol("₹");
    }
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
  }, [currency, user, setWatchList]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchList,
        setWatchList,
        pic,
        setPic,
        progress,
        setProgress,
        imgLoading,
        setImgLoading,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
