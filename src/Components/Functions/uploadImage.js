import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "../../Firebase";

export const handleImageChange = (pics,setPic,setAlert,setProgress,setImgLoading) => {
    if (pics === undefined) {
      setAlert({
        type: "warning",
        message: "Please Select an Image!",
        open: true,
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
        setImgLoading(true);
      const storageRef = ref(storage, `images/${pics.name}`);
      const uploadTask = uploadBytesResumable(storageRef, pics);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);

        },
        (error) => {
          console.log(error);
          setAlert({
            type: "error",
            message: "Error Uploading Image",
            open: true,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setPic(url);
            console.log(url);
            updateProfile(auth.currentUser, {
              photoURL: url,
            })
              .then(() => {
                setAlert({
                  type: "success",
                  message: "Profile Picture Updated",
                  open: true,
                });
                setImgLoading(false);
              })
              .catch((error) => {
                setAlert({
                  type: "error",
                  message: "Error Updating Profile Picture",
                  open: true,
                });
              });
          });
        }
      );
    } else {
      setAlert({
        type: "warning",
        message: "Please Select a Valid Image",
        open: true,
      });
    }
  };