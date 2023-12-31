import { useContext, useEffect, useState } from "react";
import { UserContext, UserProvider } from "../contexts/UserContext";
import { deleteCommentbyID, getCommentsByArticleID } from "../utils/api";
import popSound from "../assets/popSound.mp3";
import { MuteModeContext } from "../contexts/MuteModeContext";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { useParams } from "react-router-dom";
import AddNewComment from "./AddNewComment";

function Comments({ showComments, setShowComments }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { article_id } = useParams();
  const [addComment, setAddComment] = useState(false);
  const { muteMode, setMuteMode } = useContext(MuteModeContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  function popwithAddComment() {
    setAddComment(true);
    muteMode=== "soundon" ? new Audio(popSound).play() : null;
  }

  function popwithdeleteComment(comment_id) {
    muteMode=== "soundon" ? new Audio(popSound).play() : null;
    deleteCommentbyID(comment_id)
    .then((response) => {
        setComments(
          comments.filter((comment) => {
            return comment.comment_id !== comment_id;
          })
        );
      })
      .catch(() => {
        setError(true);
      });
  }

  useEffect(() => {
    getCommentsByArticleID(article_id)
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <p>error!</p>;
  } else if (loading) {
    return <p>Loading comments for this article! Please wait a moment.</p>;
  } else if (comments.length === 0) {
    return (
      <h3>
        {" "}
        There are no comments yet! Would you like to write one?
        <button id="red-button" onClick={popwithAddComment}>
          add a comment
        </button>
      </h3>
    );
  } else {
    return (
      <ul>
        <div id={`add-new-comment-buttons-and-form-sticky-container-${darkMode}`}>
        <button id="red-button" onClick={popwithAddComment}>
          add a comment
        </button>
        {addComment ? (
          <AddNewComment
            comments={comments}
            setComments={setComments}
            setAddComment={setAddComment}
          />
        ) : null}
        </div>
        {comments.map((comment) => {
          return (
            <li
              key={comment.comment_id}
              className={`post-it-style-${darkMode}`}
              id="Listcomments"
            >
              <p>comment by {comment.author}</p>
              <p>
                Votes: {comment.votes} {"   "}
                {user !== comment.author ? null : (
                  <button
                    id="blue-button"
                    onClick={() => popwithdeleteComment(comment.comment_id)}
                  >
                    delete your comment
                  </button>
                )}
                {error ? (
                  <p>error deleting that comment! Better try again later</p>
                ) : null}
                {error ? (
                  <p>error deleting that comment! Better try again later</p>
                ) : null}
              </p>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default Comments;
