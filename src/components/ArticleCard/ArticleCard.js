import ArticleButton from "../ArticleButton/ArticleButton";
import "./ArticleCard.css";
function ArticleCard() {
  return (
    <>
      <div className="ArticleCard">
        <h1>TECHNOCALSTUFF/CHEATSHEET</h1>
        <ArticleButton />
        <ArticleButton />
        <ArticleButton />
      </div>
    </>
  );
}

export default ArticleCard;
