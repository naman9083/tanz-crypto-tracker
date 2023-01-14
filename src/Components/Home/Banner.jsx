import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Bannerpic from "./banner2.jpg";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${Bannerpic})`,
    backgroundSize: "cover",
    backgroundPosition: "center",

  },
  bannerContent: {
    height: 400,
    display: "flex",
    justifyContent: "space-around",
    paddingTop: 25,
    flexDirection: "column",
  },
  tagline: {
    
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    height: "40%",
    justifyContent: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              marginBottom: 15,
              fontFamily: "Montserrat",
              fontWeight: 700,
            }}
          >
            Tanz Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              fontFamily: "Montserrat",
              textTransform: "capitalize",
              color: "darkgrey",
            }}
          >
            Track all your crypto currencies in one place
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
};

export default Banner;
