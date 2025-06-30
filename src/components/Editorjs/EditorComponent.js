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
        byFile: "http://localhost:4000/upload", // Backend file uploader endpoint
        byUrl: "http://localhost:4000/download", // Endpoint for image URL upload (if needed)
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
const mydata = exampleData;
function EditorComponent({ setData }) {
  const editorRef = useRef(null); // Ref to store the EditorJS instance

  useEffect(() => {
    const editorHolder = document.getElementById("editorjs"); // Ensure element exists

    // Initialize EditorJS only if `editorjs` element exists
    if (editorHolder && !editorRef.current) {
      editorRef.current = new EditorJS({
        data: mydata,
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
          console.log("Article data: ", outputData);
          // setData(outputData)
        })
        .catch((error) => {
          console.error("Saving failed: ", error);
        });
    }
  }

  return (
    <>
      <h1>Here Editor should load</h1>
      <div id="editorjs"></div>
      <button onClick={saveEditorData}>SAVE EDITOR DATAA</button>
    </>
  );
}

export default EditorComponent;
