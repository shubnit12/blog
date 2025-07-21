import ArticleCard from "../ArticleCard/ArticleCard";
import "./ArticleSelectionBox.css";
function ArticleSelectionBox(props) {
  console.log("ArticleSelectionBox");
  return (
    <>
      <div className="ArticleSelectionBox">
        <ArticleCard
          apiURL={props.apiURL}
          setcurrentEditArticle={props.setcurrentEditArticle}
          isloggedin={props.isloggedin}
          setcurrentArticle={props.setcurrentArticle}
          data={props.ArticlesData}
          cookieValue={props.cookieValue}
        ></ArticleCard>
        {/* <ArticleCard></ArticleCard> */}
      </div>
    </>
  );
}
export default ArticleSelectionBox;
