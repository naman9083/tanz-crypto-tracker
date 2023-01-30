import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { CryptoState } from "../Config/CryptoContext";
import { Avatar, Button } from "@material-ui/core";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { handleImageChange } from "./Functions/uploadImage";
import { CircularProgressbar } from "react-circular-progressbar";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  container: {
    width: 350,
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
    height: "100%",
    padding: 25,
    backgroundColor: "#1b1b1b",
  },
  avatar: {
    width: 200,
    height: 200,
    cursor: "pointer",

    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
    flex: 1,
  },
  logout: {
    width: "100%",
    height: "8%",
    backgroundColor: "#EEBC1D",
    color: "black",
    fontWeight: "bolder",
  },
  watchList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
    flex: 1,
    padding: 15,
    paddingTop: 10,
    borderRadius: 10,
    overflowY: "scroll",
    backgroundColor: "grey",
  },
  coin: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#EEBC1D",
    color: "black",
    boxShadow: "0px 0px 5px black",
  },
});

export default function UserSideBar() {
  const classes = useStyles();
  const {
    user,
    setAlert,
    watchList,
    coins,
    symbol,
    setPic,
    progress,
    setProgress,
    imgLoading,
    setImgLoading,
  } = CryptoState();

  const [gPic, setGPic] = useState("");
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const inputFile = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  useEffect(() => {
    if (user.photoURL) {
      setGPic(user.photoURL);
    }
  }, [user.photoURL]);

  const drawerItems = (coin) => {
    if (watchList.includes(coin.id)) {
      return (
        <div key={coin.id} className={classes.coin}>
          <span
            style={{
              fontSize: 15,
              textShadow: "0px 0px 5px black",
            }}
          >
            {coin.name}
          </span>
          <span
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
            <AiFillDelete
              style={{ color: "red", cursor: "pointer", fontSize: "16" }}
              onClick={() => {
                removeFromWatchList(coin);
              }}
            />
          </span>
        </div>
      );
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const removeFromWatchList = async (coin) => {
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
  const logout = () => {
    signOut(auth);
    setAlert({
      type: "success",
      message: "Logged Out Successfully",
      open: true,
    });
    toggleDrawer();
  };
  useEffect(() => {
    console.log(watchList);
  }, [watchList]);
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
            style={{
              cursor: "pointer",
              height: 40,
              width: 40,
              backgroundColor: "#EEBC1D",
            }}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                {imgLoading ? (
                  <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={{
                      root: { width: 200, height: 200 },
                      path: {
                        stroke: `rgba(62, 152, 199, ${progress / 100})`,
                        textAlign: "center",
                      },
                      trail: {
                        stroke: "#d6d6d6",
                        textAlign: "center",
                      },
                      text: {
                        fill: "green",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        textAlign: "center",
                      },
                    }}
                  />
                ) : (
                  <Avatar
                    onClick={onButtonClick}
                    src={gPic}
                    alt={user.displayName || user.email}
                    className={classes.avatar}
                  />
                )}

                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={(e) =>
                    handleImageChange(
                      e.target.files[0],
                      setPic,
                      setAlert,
                      setProgress,
                      setImgLoading
                    )
                  }
                  style={{ display: "none" }}
                />
                <span
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 20,
                    color: "white",
                    wordWrap: "break-word",
                    fontWeight: "bolder",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchList}>
                  <span
                    style={{
                      fontSize: 15,
                      textShadow: "0px 0px 5px black",
                    }}
                  >
                    Watchlist
                  </span>

                  {coins.map((coin) => drawerItems(coin))}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                // style={{ position: "absolute", bottom: 0 }}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
