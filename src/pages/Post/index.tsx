import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import Header from "../../components/Header";
import { PostType } from "../../types/models";
import "./styles.scss";

const Post = () => {
  const [post, setPost] = useState<PostType>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [images, setImages] = useState([
    {
      original: "",
      thumbnail: "",
    },
  ]);

  function getData() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `posts/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.val());
          const aux = snapshot.val().images.map((value: string) => {
            return { original: value, thumbnail: value };
          });
          setImages(aux);
          setIsLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="post-page">
        <div className="container">
          <h1>{post?.title}</h1>
          {isLoading ? (
            <div
              className="spinner-border text-primary m-3 mx-auto"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <ImageGallery
              items={images}
              showPlayButton={false}
              showThumbnails={false}
            />
          )}
          <p>{post?.description}</p>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Post;
