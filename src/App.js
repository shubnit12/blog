import "./App.css";
import ArticleSelectionBox from "./components/ArticleSelectionBox/ArticleSelectionBox";
import { ThemeContext } from "./components/Theme/ThemeProvider";
import { useContext } from "react";
import Theme from "./components/Theme/Theme";
import EditorComponent from "./components/Editorjs/EditorComponent";
import exampleData from "./exampleData";
import EditorParser from "./components/EditorParser/EditorParser";
import { useState } from "react";

function App() {
  // const [data, setData] = useState(exampleData);
  let data = exampleData;
  const setData = {};
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <EditorParser data={data}></EditorParser>
      <Theme toggleTheme={toggleTheme}></Theme>
      <ArticleSelectionBox></ArticleSelectionBox>
      <h1>--------------------------------</h1>
      <h1>--------------------------------</h1>
      <EditorComponent setData={setData}></EditorComponent>
      <h1>--------------------------------</h1>
    </div>
  );
}

export default App;
