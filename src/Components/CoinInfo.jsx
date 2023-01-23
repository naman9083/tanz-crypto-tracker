import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CryptoState } from "../Config/CryptoContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const { currency } = CryptoState();
  const [HistoricalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const [label,setLabel] = useState("Prices of 1D")
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    console.log("chala");
    console.log(data);
    setHistoricalData(data.prices);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      width: "75%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const classes = useStyles();
  const labels = HistoricalData.map((a) => {
    let date = new Date(a[0]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: HistoricalData.map((a) => a[1]),
        borderColor: "gold",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!HistoricalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line data={data} />
          </>
        )}
        <div style={{ display: "flex", marginTop: 20 }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "gold",
              cursor: "pointer",
              outline: "none",
              marginRight: 10,
            }}
            onClick={() => {
              setDays(1);
              setLabel("Prices of 1D")
            }}
          >
            1D
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "gold",
              cursor: "pointer",
              outline: "none",
              marginRight: 10,
            }}
            onClick={() => {
              setDays(7);
              setLabel("Prices of 7D")
            }}
          >
            7D
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "gold",
              cursor: "pointer",
              outline: "none",
              marginRight: 10,
            }}
            onClick={() => {
              setDays(30);
              setLabel("Prices of 30D")
            }}
          >
            30D
          </button>
          </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
