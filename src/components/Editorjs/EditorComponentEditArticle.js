import "./EditorComponent.css";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import EditorjsList from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Undo from "editorjs-undo";
import editorjsCodeflask from "@calumk/editorjs-codeflask";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import React, { useRef, useEffect, useState } from "react";
import editorjsCodecup from "@calumk/editorjs-codecup";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ShowMessage from "../showMessage/ShowMessage";



function EditorComponentEditArticle(props) {
  const [savingStatus, setsavingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [showMessageData, setShowMessageData] = useState(null);
  const [populateData, setPopulateData] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    // Populate article data when `currentEditArticle` changes
    if (props.articleId && props.data) {
      const article = props.data.find(
        (article) => article._id === props.articleId
      );
      if (article && article.article) {
        // console.log("Populating data for article: ", props.articleId, article.article);
        setPopulateData(article.article); // Update the article data
      }
    }
  }, [props.articleId, props.data]);

  useEffect(() => {
    const editorHolder = document.getElementById("editorjs");
    const EDITORJS_CONFIG_TOOLS = {
  header: {
    class: Header,
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
    additionalRequestHeaders: {
        Authorization: props.cookieValue // Pass the authentication token here
      },
  },
  code: editorjsCodecup,
  table: Table,
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
    // Reinitialize EditorJS if `populateData` changes
    if (editorHolder && populateData) {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null; // Reset the editor instance
      }

      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: EDITORJS_CONFIG_TOOLS,
        data: populateData, // Load article data here
        onReady: () => {
          // console.log("Editor.js is ready to work!");
          new Undo({ editor: editorRef.current });
        },
      });
    }
  }, [populateData]);

  function saveEditorData() {
    if (editorRef.current) {
      editorRef.current
        .save()
        .then((outputData) => {
          setsavingStatus(true);
          setError(null);
          //   console.log("Article data: ", outputData);

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", props.cookieValue);

          const raw = {
            _id: props.articleId,
            article: outputData,
          };
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: "follow",
          };

          fetch("https://api.shubnit.com/updateArticle", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              setsavingStatus(null);
              setShowMessageData(result);
              setTimeout(() => {
                setShowMessageData(null);
              }, 5000);
            })
            .catch((error) => {
              // console.error(error);
              setError(true);
            });
        })
        .catch((error) => {
          // console.error("Saving failed: ", error);
        });
    }
  }

  return (
    <>
      <div className="EditorComponent">
        <h1>Article Editor</h1>
        <div id="editorjs"></div>
        <button onClick={saveEditorData} className="saveEditorDataButton">
          Save Changes
        </button>
        {savingStatus ? <LoadingPage></LoadingPage> : null}
        {error ? <ErrorPage></ErrorPage> : null}
        {showMessageData ? (
          <ShowMessage content={showMessageData}></ShowMessage>
        ) : null}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
}

export default EditorComponentEditArticle;
