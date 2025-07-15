import ArticleButton from "../ArticleButton/ArticleButton";
import "./ArticleCard.css";
function ArticleCard(props) {
  console.log("ArticleCard");
  let articleHeadingsList = [];
  props.data.forEach((article) => {
    articleHeadingsList.push(
      <ArticleButton
        articleData={props.data}
        key={article._id}
        articleHeadingsID={article._id}
        articleHeadings={article.article.blocks[0].data.text}
        setcurrentArticle={props.setcurrentArticle}
      />
    );
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
