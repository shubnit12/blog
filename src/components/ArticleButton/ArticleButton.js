import "./ArticleButton.css";
function ArticleButton(props) {
  console.log("ArticleButton");
  function articleHeadingClicked(event) {
    console.log(event.target.id);
    console.log(props);

    for (let i = 0; i < props.articleData.length; i++) {
      console.log("i : ", i);

      if (props.articleData[i]._id === event.target.id) {
        console.log(props.articleData[i].article);
        props.setcurrentArticle(props.articleData[i].article);
        break;
      }
    }
  }
  return (
    <>
      <div className="articleButton">
        <button id={props.articleHeadingsID} onClick={articleHeadingClicked}>
          {props.articleHeadings}
        </button>
        {/* <button>edit</button> */}
      </div>
    </>
  );
}
export default ArticleButton;
