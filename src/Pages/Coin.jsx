import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../Config/api";

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();


  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      // [theme.breakpoints.down("md")]: {
      //   width: "100%",
      // },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      // borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      textAlign: "justify",
      width: "100%",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      fontFamily: "Montserrat",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
      </div>
      <Typography variant="h3" className={classes.heading}>
        {coin?.name}
      </Typography>
      <Typography variant="subtitle2" className={classes.description}>
        {coin?.description.en.split(". ")[0]+". " +coin?.description.en.split(". ")[1]}
      </Typography>
      <CoinInfo coin={coin}/>
    </div>
  );
};

export default Coin;
