import Header from "../../components/Header";
import { onValue, ref } from "firebase/database";
import { db } from "../../services/firebase";
import { PostType } from "../../types/models";
import { useState } from "react";
import { useEffect } from "react";

import "./styles.scss";
import Card from "../../components/Card";
import Masonry from "react-masonry-css";

const Posts = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 1,
    500: 1,
  };
  const [posts, setPosts] = useState<any>([
    {
      title: "",
      description: "",
      images: [""],
    },
  ]);

  useEffect(() => {
    const starCountRef = ref(db, "posts/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arr = Object.keys(data).map((k) => data[k]);
      setPosts(
        arr.sort(function (a, b) {
          return a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0;
        })
      );
    });
  }, []);

  return (
    <>
      <Header />
      <div className="posts-page">
        <div className="container">
          <h1>Publicações</h1>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid posts"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post: PostType) => (
              <Card
                key={post.key}
                code={post.key}
                title={post.title}
                description={post.description}
                images={post.images}
              />
            ))}
          </Masonry>
        </div>
      </div>
    </>
  );
};

export default Posts;
