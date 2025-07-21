import "./App.css";
import ArticleSelectionBox from "./components/ArticleSelectionBox/ArticleSelectionBox";
import { ThemeContext } from "./components/Theme/ThemeProvider";
import { useContext } from "react";
import Theme from "./components/Theme/Theme";
import EditorComponent from "./components/Editorjs/EditorComponent";
import exampleData from "./exampleData";
import EditorParser from "./components/EditorParser/EditorParser";
import { useState, useEffect } from "react";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import ShowMessage from "./components/showMessage/ShowMessage";
import Signin from "./components/SignIn/Signin";
import { BrowserRouter, Routes, Route, useActionData } from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";
import EditorComponentEditArticle from "./components/Editorjs/EditorComponentEditArticle";
// const apiURL = "http://localhost:4000";
const apiURL = "https://api.shubnit.com";

function App() {
  console.log("App");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentArticle, setcurrentArticle] = useState(null);
  const [signinButtonClicked, setsigninButtonClicked] = useState(false);
  const [isloggedin, setisloggedin] = useState(false);
  const [cookieValue, setcookieValue] = useState(null);
  const [showEditor, setshowEditor] = useState(false);
  const [currentEditArticle, setcurrentEditArticle] = useState(null);
  const [populateData, setPopulateData] = useState(null);

  const [closeUpdateArticleEditor, setcloseUpdateArticleEditor] =
    useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(`${apiURL}/getAllArticles`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    let cookieArray = document.cookie.split("; ");
    let cookieFromLS = localStorage.getItem("ShubnitToken");
    if (cookieFromLS) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", cookieFromLS);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${apiURL}/validateJwtToken`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log("validateJwtToken : ", JSON.parse(result).tokenIsValid);
          if (JSON.parse(result).tokenIsValid) {
            setisloggedin(true);
          } else {
            document.cookie =
              "ShubnitToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem("ShubnitToken");
            setisloggedin(false);
            setcookieValue(null);
          }
        })
        .catch((error) => console.error(error));
      setcookieValue(cookieFromLS);
    }
    // console.log("cookieFromLS : ", cookieFromLS);
    // const cookiemap = {};
    cookieArray.forEach((element) => {
      if (element.split("=")[0] === "ShubnitToken") {
        // console.log("mytoken is prenetn");
        // const myHeaders = new Headers();
        // myHeaders.append("Authorization", element.split("=")[1]);
        // const requestOptions = {
        //   method: "GET",
        //   headers: myHeaders,
        //   redirect: "follow",
        // };
        // fetch(`${apiURL}/validateJwtToken`, requestOptions)
        //   .then((response) => response.text())
        //   .then((result) => {
        //     console.log("validateJwtToken : ", JSON.parse(result).tokenIsValid);
        //     if (JSON.parse(result).tokenIsValid) {
        //       setisloggedin(true);
        //     } else {
        //       document.cookie =
        //         "ShubnitToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //       setisloggedin(false);
        //       setcookieValue(null);
        //     }
        //   })
        //   .catch((error) => console.error(error));
        // setcookieValue(element.split("=")[1]);
        // console.log("cookieValue : " , cookieValue)
      }
    });
  }, []);
  useEffect(() => {
    // console.log("Updated cookieValue:", cookieValue);
  }, [cookieValue]);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  if (error) {
    return <ErrorPage errorData={error}></ErrorPage>;
  }
  function LoadEditor() {
    setshowEditor(showEditor ? false : true);
  }
  function signOutPlease() {
    document.cookie =
      "ShubnitToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("ShubnitToken");
    setisloggedin(false);
    setcookieValue(null);
  }
  function closeEditArticlePlease() {
    setcurrentEditArticle(null);
  }
  function closeArticlePlease() {
    setcurrentArticle(null);
  }

  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      {isloggedin ? (
        <div>
          <button onClick={LoadEditor}>Load Editor</button>
          <button onClick={signOutPlease}>SignOut</button>
        </div>
      ) : (
        <></>
      )}
      <Signin
        clickedStateSetter={setsigninButtonClicked}
        clickedStategetter={signinButtonClicked}
        isloggedinState={isloggedin}
        cookieValue={cookieValue}
      ></Signin>
      {signinButtonClicked ? (
        <LoginPage
          apiURL={apiURL}
          setisloggedinState={setisloggedin}
          clickedStateSetter={setsigninButtonClicked}
          setcookieValue={setcookieValue}
        ></LoginPage>
      ) : (
        <></>
      )}
      <Routes>
        <Route path="/login" element={<Signin></Signin>}></Route>
      </Routes>

      {showEditor ? (
        <EditorComponent
          cookieValue={cookieValue}
          apiURL={apiURL}
        ></EditorComponent>
      ) : (
        <></>
      )}

      <br></br>
      <br></br>
      <br></br>

      <Theme toggleTheme={toggleTheme}></Theme>
      <ArticleSelectionBox
        currentArticle={currentArticle}
        apiURL={apiURL}
        ArticlesData={data}
        setcurrentEditArticle={setcurrentEditArticle}
        setcurrentArticle={setcurrentArticle}
        cookieValue={cookieValue}
        isloggedin={isloggedin}
      ></ArticleSelectionBox>
      {currentArticle ? (
        <>
          {" "}
          <button onClick={closeArticlePlease}>closeArticle</button>
          <EditorParser data={currentArticle}></EditorParser>
        </>
      ) : (
        <></>
      )}

      {currentEditArticle ? (
        <>
          <button onClick={closeEditArticlePlease}>closeEditArticle</button>
          <EditorComponentEditArticle
            apiURL={apiURL}
            cookieValue={cookieValue}
            articleId={currentEditArticle}
            data={data}
            populateData={populateData}
            setPopulateData={setPopulateData}
          ></EditorComponentEditArticle>
        </>
      ) : (
        <></>
      )}
      {/* <EditorComponent setData={setData}></EditorComponent> */}
    </div>
  );
}

export default App;
