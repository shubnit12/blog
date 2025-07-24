import "./EditorComponent.css";
import EditorJS from "@editorjs/editorjs";
// import Table from 'editorjs-table'
import Table from "@editorjs/table";
import EditorjsList from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Undo from "editorjs-undo";
import editorjsCodeflask from "@calumk/editorjs-codeflask";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import React, { useRef, useEffect } from "react";
import exampleData from "../../exampleData";
import editorjsCodecup from "@calumk/editorjs-codecup";
import { useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ShowMessage from "../showMessage/ShowMessage";
const EDITORJS_CONFIG_TOOLS = {
  // code: CodeTool,
  header: {
    class: Header,
    // config: {
    //   placeholder: 'Enter a header',
    //   // levels: [2, 3, 4],
    //   // defaultLevel: 3
    // }
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "https://api.shubnit.com/upload", // Backend file uploader endpoint
        byUrl: "https://api.shubnit.com/download", // Endpoint for image URL upload (if needed)
      },
      field: "image",
    },
  },
  // code: editorjsCodeflask,
  code: editorjsCodecup,
  table: Table,
  // {
  //   class: Table,
  //   inlineToolbar: true,
  // },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  List: {
    class: EditorjsList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
};
function EditorComponent(props) {
  const [savingStatus, setsavingStatus] = useState(null);
  const [error, seterror] = useState(null);
  const [showmessageData, setshowmessageData] = useState(null);
  console.log("EditorComponent");
  const editorRef = useRef(null); // Ref to store the EditorJS instance

  useEffect(() => {
    const editorHolder = document.getElementById("editorjs"); // Ensure element exists

    // Initialize EditorJS only if `editorjs` element exists
    if (editorHolder && !editorRef.current) {
      editorRef.current = new EditorJS({
        // readOnly: true,
        holder: "editorjs", // Element ID for EditorJS
        tools: EDITORJS_CONFIG_TOOLS,
        onReady: () => {
          console.log("Editor.js is ready to work!");

          new Undo({ editor: editorRef.current });
        },
      });
    }
  }, []);

  // Save EditorJS data function
  function saveEditorData() {
    if (editorRef.current) {
      editorRef.current
        .save()
        .then((outputData) => {
          setsavingStatus(true);
          seterror(null);
          console.log("Article data: ", outputData);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          console.log(props.cookieValue);
          myHeaders.append("Authorization", props.cookieValue);
          const raw = JSON.stringify(outputData);
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          fetch("https://api.shubnit.com/addArticle", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(result);
              setsavingStatus(null);
              setshowmessageData(result);
              setTimeout(() => {
                setshowmessageData(null);
              }, 5000);
            })
            .catch((error) => {
              console.error(error);
              seterror(true);
            });
        })
        .catch((error) => {
          console.error("Saving failed: ", error);
        });
    }
  }

  return (
    <>
      <div className="EditorComponent">
        <h1>This is Article Editor</h1>
        <div id="editorjs"></div>
        <button onClick={saveEditorData} className="saveEditorDataButton">SAVE EDITOR DATAA</button>
        {savingStatus ? <LoadingPage></LoadingPage> : <></>}
        {error ? <ErrorPage></ErrorPage> : <></>}
        {showmessageData ? (
          <ShowMessage content={showmessageData}></ShowMessage>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default EditorComponent;
