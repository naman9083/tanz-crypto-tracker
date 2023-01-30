// import { CryptoState } from "../../Config/CryptoContext";
// const {setAlert} = CryptoState();
// const postDetails = (pics) => {
//     if (pics === undefined) {
//       setAlert({
//         type: "warning",
//         message: "Please Select an Image!",
//         open: true,
//       });
//       return;
//     }
//     console.log(pics);
//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "chat-app");
//       data.append("cloud_name", "naman4563");
//       fetch("https://api.cloudinary.com/v1_1/naman4563/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPic(data.url.toString());
//           console.log(data.url.toString());
          
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setPicLoading(false);
//       return;
//     }
//   };
