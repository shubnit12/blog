import "./Signin.css";

function Signin(props) {
  function SigninButtonClickHandler() {
    props.clickedStateSetter(props.clickedStategetter ? false : true);

    // console.log(
    //   "SigninButtonClickHandler is clicked",
    //   props.clickedStategetter
    // );
  }
  return (
    <>
      <div className="Signin">
        <button onClick={SigninButtonClickHandler}>
          {props.isloggedinState || props.cookieValue ? "Signed IN" : "Sign IN"}
        </button>
      </div>
    </>
  );
}
export default Signin;
