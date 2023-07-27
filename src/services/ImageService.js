import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error("uriToBlob failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};

export const uploadToFirebase = (blob, id) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `uploads/${id}.jpeg`);
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        blob.close();
        getDownloadURL(storageRef)
          .then((link) => resolve(link))
          .catch((err) => reject(err));
      })
      .catch((err) => {
        reject(err);
      });
  });
};
