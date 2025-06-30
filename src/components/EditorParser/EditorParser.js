// edjsHTML tranforms editor js blocks to html
import edjsHTML from "editorjs-html";
// this function parses strings (html elements) to html
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import "./EditorParser.css";
// Parse this block in editorjs-html
function customParser(block) {
  let mydata = ``;
  for (let i = 0; i < block.data.items.length; i++) {
    if (block.data.style === "checklist") {
      if (block.data.items[i].meta.checked === true) {
        mydata =
          mydata +
          `<span><input checked type="checkbox" id="${block.data.items[i].content}" name="${block.data.items[i].content}" value="${block.data.items[i].content}">
         <label for="${block.data.items[i].content}"> ${block.data.items[i].content}</label><br></span>`;
      } else {
        mydata =
          mydata +
          `<span><input type="checkbox" id="${block.data.items[i].content}" name="${block.data.items[i].content}" value="${block.data.items[i].content}">
         <label for="${block.data.items[i].content}"> ${block.data.items[i].content}</label><br></span>`;
      }
    }
    if (block.data.style === "unordered") {
      mydata = mydata + `<li> ${block.data.items[i].content} </li>`;
    }
    if (block.data.style === "ordered") {
      if (i === 0) {
        mydata = mydata + `<ol><li> ${block.data.items[i].content} </li>`;
      } else if (i === block.data.items.length - 1) {
        mydata = mydata + `<li> ${block.data.items[i].content} </li></ol>`;
      } else {
        mydata = mydata + `<li> ${block.data.items[i].content} </li>`;
      }
    }
  }
  return mydata;
}

function customParserTable(block) {
  let mydata = `<table>`;
  for (let i = 0; i < block.data.content.length; i++) {
    if (i === 0) {
      // First row is treated as the table header
      mydata += `<thead><tr>`;
      for (let heading of block.data.content[i]) {
        mydata += `<th>${heading}</th>`;
      }
      mydata += `</tr></thead>`;
    } else {
      // Subsequent rows are table data
      mydata += `<tr>`;
      for (let cell of block.data.content[i]) {
        mydata += `<td>${cell}</td>`;
      }
      mydata += `</tr>`;
    }
  }
  mydata += `</table>`;
  return mydata;
}
const plugins = {
  // The keyname must match with the type of block you want to parse with this funcion
  List: customParser,
  table: customParserTable,
  // ... add more or overwrite
};

const edjsParser = edjsHTML(plugins);
export default function EditorTextParser({ data }) {
  console.log("original Data", data);
  function escapeHTML(htmlString) {
    const safeString = String(htmlString);
    return (
      safeString
        // .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    );
  }
  try {
    for (let i = 0; i < data.blocks.length; i++) {
      if (data.blocks[i].type === "code") {
        data.blocks[i].data.code = escapeHTML(data.blocks[i].data.code);
      }
    }
  } catch (error) {}
  const html = edjsParser.parse(data);
  let finalData = parse(html);
  console.log(finalData);

  return <div className="text-container">{finalData}</div>;
}
