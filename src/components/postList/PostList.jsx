import "./index.css";
import PostCard from "../postCard";
import { useEffect, useState, useRef } from "react";

const PostList = ({ refProp }) => {
  const [postData, setPostData] = useState([]);

  // Esercizio 09-03-2023 - useRef
  // Ho utilizzato la useRef per fare in modo che in mobalità mobile,
  // dopo lo scroll di due post (scroll >=333), si aggiungesse la classe show alla sezione nav con
  // all/mentions e si rimuovesse l'header. E che ritornasse allo stato iniziale una volta che il
  // valore dello scroll fosse minore a 333

  const postWindowRef = useRef(null);
  const navSectionRef = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then(({ posts }) => setPostData(posts));
  }, []);
  const scrollEventFun = () => {
    {
      postWindowRef.current.scrollTop >= 333
        ? (navSectionRef.current.className = "show") &&
          (refProp.current.className = "posts_container_headerHide ")
        : (navSectionRef.current.className = "navSection") &&
          (refProp.current.className = "");
    }
  };

  return (
    <div
      className="posts_container"
      ref={postWindowRef}
      onScroll={scrollEventFun}
    >
      <div className="navSection" ref={navSectionRef}>
        <div className="allSection">
          <p>All</p>
        </div>
        <div className="mentionSection">
          <p>Mentions</p>
        </div>
      </div>
      {postData.map((post) => (
        <PostCard postData={post} key={post.id} />
      ))}
    </div>
  );
};
export default PostList;
