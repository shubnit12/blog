import { useEffect, useState } from "react";
import ArticleButton from "../ArticleButton/ArticleButton";
import "./ArticleCard.css";
function ArticleCard(props) {
  const [jwtTokenIsValid, setjwtTokenIsValid] = useState(false);
  console.log("ArticleCard");
  let articleHeadingsList = [];

  //check if token is valid
  // if valid show edit button else not show edit button
  useEffect(() => {
    if (props.cookieValue !== null) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.cookieValue);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${props.apiURL}/validateJwtToken`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log("result from article card : ", result);
          if (JSON.parse(result).tokenIsValid) {
            setjwtTokenIsValid(true);
          } else {
            setjwtTokenIsValid(false);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [props.isloggedin]);
  props.data.forEach((article) => {
    if (article.article.blocks.length !== 0) {
      articleHeadingsList.push(
        <ArticleButton
          currentArticle={props.currentArticle}
          setcurrentEditArticle={props.setcurrentEditArticle}
          isloggedin={props.isloggedin}
          articleData={props.data}
          key={article._id}
          articleHeadingsID={article._id}
          articleHeadings={article.article.blocks[0].data.text}
          setcurrentArticle={props.setcurrentArticle}
          jwtTokenIsValid={jwtTokenIsValid}
        />
      );
    }
  });
  return (
    <>
      <div className="ArticleCard">
        <h1>TECHNOCALSTUFF/CHEATSHEET</h1>
        {articleHeadingsList}
      </div>
    </>
  );
}

export default ArticleCard;
