import ArticleCard from "../ArticleCard/ArticleCard";
import "./ArticleSelectionBox.css";
function ArticleSelectionBox() {
  return (
    <>
      <div className="ArticleSelectionBox">
        <ArticleCard></ArticleCard>
        <ArticleCard></ArticleCard>
      </div>
    </>
  );
}
export default ArticleSelectionBox;
