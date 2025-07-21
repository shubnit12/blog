import { useEffect } from "react";
import "./ArticleButton.css";
function ArticleButton(props) {
  // console.log(props.jwtTokenIsValid)

  console.log("ArticleButton");
  function articleHeadingClicked(event) {
    // console.log("event.target.id : " , event.target.className);
    for (let i = 0; i < props.articleData.length; i++) {
      // console.log("i : ", i);

      if (props.articleData[i]._id === event.target.id) {
        // console.log(props.articleData[i].article);
        props.setcurrentArticle(props.articleData[i].article);
        break;
      }
    }

    // }
  }
  function articleEditButtonClicked(event) {
    // console.log("articleEditButtonClicked event : ",event.target.parentNode.querySelector(".headingButton").id)
    props.setcurrentEditArticle(
      event.target.parentNode.querySelector(".headingButton").id
    );
  }

  return (
    <>
      <div className="articleButton">
        <button
          className="headingButton"
          id={props.articleHeadingsID}
          onClick={articleHeadingClicked}
        >
          {props.articleHeadings}
        </button>
        {props.jwtTokenIsValid ? (
          <button
            className="editButtonInsideHeadingButton"
            onClick={articleEditButtonClicked}
          >
            edit
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default ArticleButton;
