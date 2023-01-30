import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../Config/api";
import { CryptoState } from "../../Config/CryptoContext";


const Carousel = () => {
  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
      
    },
    "@media (max-width: 512px)": {
      
      carousel: {
        height: "100%",
      },
    },

  }));
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const classes = useStyles();
  const { currency,symbol } = CryptoState();
  const [trendingCoins, setTrendingCoins] = useState([]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };
  const items = trendingCoins.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} className={classes.carouselItem} >
        <img
          src={coin.image}
          alt={coin.name}
          className={classes.carouselImage}
          style={{ marginBottom: 10 }}
          height="80"
        />

        <span>
          {coin.symbol}
          &nbsp;
          <span style={{color:profit?"green":"red"}}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight:500 }}>
          {symbol}{numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line
  }, [currency]);
  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        disableButtonsControls
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
