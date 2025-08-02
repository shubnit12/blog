import "./LoginPage.css";
import { useState } from "react";
import Cookies from "js-cookie";
import ErrorPage from "../ErrorPage/ErrorPage";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(null);
  function LoginFormSubmitHandler(event) {
    event.preventDefault();
    // console.log("LoginButton Is Clicked");
    // console.log("Submitted Username:", username);
    // console.log("Submitted Password:", password);
    if (username && password) {
      // console.log("sending data to server");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        user: {
          id: username,
          password: password,
        },
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include",
      };

      fetch(`${props.apiURL}/login`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // console.log();

          if (Object.keys(JSON.parse(result))[0] === "error") {
            seterror(result);
            setTimeout(() => {
              seterror(null);
            }, 5000);
          } else {
            // console.log(" from login page : ", result , "token : " , JSON.parse(result).JWTtoken);
             Cookies.set("ShubnitToken", JSON.parse(result).JWTtoken, {
              secure: true, // Ensures cookie is only sent over HTTPS
              sameSite: "strict", // Helps protect against CSRF attacks
              path: "/", // Sets the path for the cookie, usually the root
              expires: 2 / 24, // Cookie expires in 2 hours (2/24 because 1 = 1 day)
            });
            props.setcookieValue(JSON.parse(result).JWTtoken);
            // localStorage.setItem("ShubnitToken", JSON.parse(result).JWTtoken);
            props.setisloggedinState(true);
            props.clickedStateSetter(false);
          }
        })
        .catch((error) => {
          // console.error(error);
          seterror(error);
          setTimeout(() => {
            seterror(null);
          }, 5000);
        });
    } else {
      seterror("Please enter all the fields");
      setTimeout(() => {
        seterror(null);
      }, 5000);
    }
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <>
      {error ? <ErrorPage errorData={error}></ErrorPage> : <></>}
      <form onSubmit={LoginFormSubmitHandler}>
        <label htmlFor="UserName">UserName:</label>
        <input
          autoComplete="true"
          type="text"
          id="UserName"
          name="Username"
          onChange={handleUsernameChange}
        />
        <br></br>
        <label htmlFor="Password">Password:</label>
        <input
          autoComplete="true"
          type="password"
          id="Password"
          name="Password"
          onChange={handlePasswordChange}
        />
        <br></br>
        <input type="submit" value="Submit" id="credentialsSubmitButton" />
      </form>
    </>
  );
}
export default LoginPage;
