import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { db, storage } from "../../services/firebase";

import "./styles.scss";
import { child, push, ref, set } from "firebase/database";
import {
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { PostType } from "../../types/models";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [post, setPost] = useState<any>({
    key: "",
    title: "",
    images: [],
    description: "",
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    const email = login;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        alert("Acesso negado");
      });
  };

  const uploadImages = async (file: File) => {
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = refStorage(storage, "post-images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }
    );

    // Upload completed successfully, now we can get the download URL
    const url = await getDownloadURL(uploadTask.snapshot.ref).then(
      (downloadURL) => {
        return downloadURL;
      }
    );

    return url;
  };

  const writePostData = async (e: any) => {
    e.preventDefault();
    setDisabled(true);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString();
    const newPostKey = push(child(ref(db), "posts")).key;

    try {
      let imagesArr: any = [];
      for (let image of [...post.images]) {
        await uploadImages(image).then((res) => {
          imagesArr.push(res);
        });
      }

      setTimeout(() => {
        set(ref(db, "posts/" + newPostKey), {
          ...post,
          images: imagesArr,
          datetime: today,
          key: newPostKey,
        });

        alert("ad feito com sucesso");
        navigate("/");
      }, 4000);
    } catch (error) {
      writePostData(e);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-md-center align-items-center vh-100 row"
      id="admin"
    >
      {!user && (
        <form className="col p-5" onSubmit={handleLogin}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              onChange={(state) => setLogin(state.target.value)}
            />
            <label className="form-label" htmlFor="form2Example1">
              Login
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              onChange={(state) => setPassword(state.target.value)}
            />
            <label className="form-label" htmlFor="form2Example2">
              Senha
            </label>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Entrar
          </button>
        </form>
      )}
      {user && (
        <form className="col p-5" onSubmit={writePostData}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Título do post</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Escreva o título do post"
              required
              onChange={(text) => {
                if (text) {
                  setPost((prevState: any) => ({
                    ...prevState,
                    title: text.target.value,
                  }));
                }
              }}
            />
          </div>

          <div className="custom-file mb-2 form-group">
            <input
              type="file"
              id="validatedCustomFile"
              required
              multiple
              onChange={(file) => {
                if (file) {
                  setPost((prevState: any) => ({
                    ...prevState,
                    images: file.target.files,
                  }));
                }
              }}
            />
            <div className="invalid-feedback">Inválido</div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Descrição</label>
            <textarea
              style={{ resize: "none" }}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              required
              onChange={(text) => {
                if (text) {
                  setPost((prevState: any) => ({
                    ...prevState,
                    description: text.target.value,
                  }));
                }
              }}
            ></textarea>
          </div>

          <button className="btn btn-primary" type="submit" disabled={disabled}>
            Postar
          </button>
        </form>
      )}
    </div>
  );
};

export default Admin;
