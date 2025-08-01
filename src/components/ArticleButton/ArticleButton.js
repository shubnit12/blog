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
  // console.log("ArticleButton");
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
  function openArticleInNewTab(event) {
    // event.stopPropagation();
    if (event.target.parentNode.nextElementSibling?.id) {
      console.log(
        "openArticleInNewTab",
        event.target.parentNode.nextElementSibling?.id
      );
      let targetPage =
        "https://blog-three-black-42.vercel.app/article/" +
        event.target.parentNode.nextElementSibling?.id;
      window.open(targetPage, "_blank", "noopener,noreferrer");

      //open article in new Page new page and
    }
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
          if (result.success) {
            setdeleteReqStatus("success");
          } else {
            setdeleteReqStatus("Error");
          }
          // console.log("result from deletearticle api : ", result);
          setshowReqStatusMessage(true);
        })
        .catch((error) => {
          // console.error(error);
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
        <span onClick={openArticleInNewTab}>
          <svg>
            <g
              id="Page-1"
              stroke="none"
              // stroke-width="1"
              fill="none"
              // fill-rule="evenodd"
            >
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-379.000000, -280.000000)"
                fill="#000000"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M341.9,137.261 C341.9,137.811 341.49785,138 340.92035,138 L331.47035,138 C330.89285,138 330.35,137.811 330.35,137.261 L330.35,135 L337.24535,135 C338.11475,135 338.75,134.589 338.75,133.761 L338.75,127 L340.92035,127 C341.49995,127 341.9,127.709 341.9,128.261 L341.9,137.261 Z M326.22035,133 C325.64285,133 325.1,132.811 325.1,132.261 L325.1,123.261 C325.1,122.709 325.6397,122 326.22035,122 L335.67035,122 C336.24995,122 336.65,122.709 336.65,123.261 L336.65,132.261 C336.65,132.811 336.24785,133 335.67035,133 L326.22035,133 Z M342.49535,125 L338.75,125 L338.75,121.761 C338.75,120.933 338.11475,120 337.24535,120 L324.64535,120 C323.7791,120 323,120.936 323,121.761 L323,133.761 C323,134.586 323.7791,135 324.64535,135 L328.25,135 L328.25,138.761 C328.25,139.586 329.0291,140 329.89535,140 L342.49535,140 C343.36475,140 344,139.589 344,138.761 L344,126.761 C344,125.933 343.36475,125 342.49535,125 L342.49535,125 Z"
                    id="new_tab-[#1502]"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </span>

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
            <label htmlFor="articleID">
              Enter The article ID to delete the article
            </label>
            <input
              type="text"
              id="articleID"
              name="articleID"
              onChange={(e) => setIDValue(e.target.value)}
            />
            <label htmlFor="secretphrase">
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
