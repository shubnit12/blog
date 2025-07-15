import ArticleCard from "../ArticleCard/ArticleCard";
import "./ArticleSelectionBox.css";
function ArticleSelectionBox(props) {
  console.log("ArticleSelectionBox");
  return (
    <>
      <div className="ArticleSelectionBox">
        <ArticleCard
          setcurrentArticle={props.setcurrentArticle}
          data={props.ArticlesData}
        ></ArticleCard>
        {/* <ArticleCard></ArticleCard> */}
      </div>
    </>
  );
}
export default ArticleSelectionBox;
