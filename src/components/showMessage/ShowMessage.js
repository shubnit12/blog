import "./ShowMessage.css";

function ShowMessage(props) {
  return (
    <>
      <div className="showMessage">{props.content}</div>
    </>
  );
}

export default ShowMessage;
