import { useEffect, useState } from "react";
import "./ArticleButton.css";
import ShowMessage from "../showMessage/ShowMessage";
function ArticleButton(props) {
  // console.log(props.jwtTokenIsValid)
  const [deletearticlebuttonclicked, setdeletearticlebuttonclicked] =
    useState(false);
  const [secretphraseValue, setsecretphraseValue] = useState("");
  const [iDValue, setIDValue] = useState("");
  const [showReqStatusMessage, setshowReqStatusMessage] = useState(false);
  const [deleteReqStatus, setdeleteReqStatus] = useState("null");
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
  function deleteArticle() {
    setdeletearticlebuttonclicked(!deletearticlebuttonclicked);
  }
  function deleteArticleRequestSenderFunction(event) {
    // console.log("secretphraseValue : ", secretphraseValue);
    // console.log("iDValue : ", iDValue);

    let cookieFromLS = localStorage.getItem("ShubnitToken");
    if (cookieFromLS) {
      let dataForDeleteArticle = JSON.stringify({
        articleID: iDValue,
        deleteSecretPhrase: secretphraseValue,
      });
      const myHeaders = new Headers();
      myHeaders.append("Authorization", cookieFromLS);
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: dataForDeleteArticle,
        redirect: "follow",
      };
      fetch("https://api.shubnit.com/deleteArticle", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setdeleteReqStatus("success");
          // console.log("result from deletearticle api : ", result);
          setshowReqStatusMessage(true);
        })
        .catch((error) => {
          console.error(error);
          setdeleteReqStatus("Error");
          setshowReqStatusMessage(true);
        });
      setTimeout(() => {
        setshowReqStatusMessage("");
        setdeleteReqStatus(false);
      }, 5000);
      event.preventDefault();
    }
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
          <>
            <button
              className="editButtonInsideHeadingButton"
              onClick={articleEditButtonClicked}
            >
              edit
            </button>
            <button
              className="deleteButtonInsideHeadingButton"
              onClick={deleteArticle}
            >
              Delete Article
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      {deletearticlebuttonclicked ? (
        <>
          <form
            method="post"
            className="articleDeleteForm"
            onSubmit={deleteArticleRequestSenderFunction}
          >
            <label for="articleID">
              Enter The article ID to delete the article
            </label>
            <input
              type="text"
              id="articleID"
              name="articleID"
              onChange={(e) => setIDValue(e.target.value)}
            />
            <label for="secretphrase">
              Enter Secret Phrase to delete the article
            </label>
            <input
              type="text"
              id="secretphrase"
              name="secretphrase"
              onChange={(e) => setsecretphraseValue(e.target.value)}
            />
            <button>DELETE ABOVE ARTICLE</button>
          </form>{" "}
        </>
      ) : (
        <></>
      )}
      {showReqStatusMessage ? (
        <ShowMessage content={deleteReqStatus}></ShowMessage>
      ) : (
        <></>
      )}
    </>
  );
}
export default ArticleButton;
