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
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";

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
  useEffect(() => {
    async function fetchArticles() {
      let cookieArray = document.cookie.split("; ");
      // const cookiemap = {};
      cookieArray.forEach((element) => {
        if (element.split("=")[0] === "ShubnitToken") {
          console.log("mytoken is prenetn");
          setcookieValue(element.split("=")[1]);
        }
      });
      // console.log("cookies Map : ", cookiemap);
      if (cookieValue) {
        // setisloggedin(true);
      }
      try {
        const response = await fetch("http://localhost:4000/getAllArticles");
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
  }, [cookieValue]);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  if (error) {
    return <ErrorPage errorData={error}></ErrorPage>;
  }
  function LoadEditor() {}
  // console.log("isloggedin && cookieValue : ", isloggedin + " " + cookieValue);
  if (isloggedin && cookieValue) {
    setshowEditor(showEditor ? false : true);
    console.log("isloggedin: ", isloggedin);
    console.log("showEditor: ", showEditor);
  }
  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <button onClick={LoadEditor}>Load Editor</button>
      <Signin
        clickedStateSetter={setsigninButtonClicked}
        clickedStategetter={signinButtonClicked}
        isloggedinState={isloggedin}
        cookieValue={cookieValue}
      ></Signin>
      {signinButtonClicked ? (
        <LoginPage
          setisloggedinState={setisloggedin}
          clickedStateSetter={setsigninButtonClicked}
        ></LoginPage>
      ) : (
        <></>
      )}
      <Routes>
        <Route path="/login" element={<Signin></Signin>}></Route>
      </Routes>

      {cookieValue ? (
        <EditorComponent cookieValue={cookieValue}></EditorComponent>
      ) : (
        <></>
      )}

      <br></br>
      <br></br>
      <br></br>

      <Theme toggleTheme={toggleTheme}></Theme>
      <ArticleSelectionBox
        ArticlesData={data}
        setcurrentArticle={setcurrentArticle}
      ></ArticleSelectionBox>
      {currentArticle ? (
        <EditorParser data={currentArticle}></EditorParser>
      ) : (
        <></>
      )}

      {/* <EditorComponent setData={setData}></EditorComponent> */}
    </div>
  );
}

export default App;
