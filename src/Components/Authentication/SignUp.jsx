import { Avatar, Box, Button, TextField } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { CryptoState } from "../../Config/CryptoContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase";
import { handleImageChange } from "../Functions/uploadImage";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setPic, setAlert, setProgress, setImgLoading,pic } = CryptoState();
  const inputFile = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        type: "error",
        message: "Passwords do not match",
        open: true,
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, {
        displayName: username,
        photoURL: pic,
      });

      setAlert({
        type: "success",
        message: "Sign Up Successfull. Welcome to Crypto Tracker",
        open: true,
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };
  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Avatar
        src= {pic || "https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg"}
        align="center"
        onClick={onButtonClick}
        style={{
          width: 100,
          height: 100,
          margin: "auto",
          cursor: "pointer",
          backgroundColor: "gold",
        }}
      />
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
      <TextField
        label="Enter Name"
        type="text"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        label="Enter Email"
        type="email"
        required
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Enter Password"
        type="password"
        required
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: "gold",
          color: "black",
          fontFamily: "Montserrat",
          fontWeight: 700,
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;

// 1 2 3 4 5 6
// 1 2 3 4
