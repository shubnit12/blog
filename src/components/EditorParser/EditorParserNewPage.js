// edjsHTML tranforms editor js blocks to html
import edjsHTML from "editorjs-html";
// this function parses strings (html elements) to html
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import "./EditorParser.css";
// import {useParams} from 'react-router'
import { useParams } from "react-router";

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
export default function EditorParserNewPage() {
  const [popup, setPopup] = useState(false);
  const [imageData, setimageData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [articleresult, setarticleresult] = useState("");

  let params = useParams();
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://api.shubnit.com/getArticleByID/${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result : ", result);
        if (result.success) {
          setarticleresult("loading");
          console.log("result.cursor[0].article : ", result.cursor[0].article);
          setArticleData(result.cursor[0].article);
        } else {
          setarticleresult("Something went wrong......");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  if (!articleData) {
    return (
      <>
        {popup ? imageData : <></>}
        {/* <div className="text-container">{finalData}</div>; */}
        <div className="text-container">
          <h1>{articleresult}</h1>
        </div>
        ;
      </>
    );
  } else {
    // console.log("articleData : " , articleData)

    let image = "";
    function closepoppedimage() {
      setPopup(false);
    }
    const imageClicked = (event) => {
      // console.log("Image has been clicked : ", event.target);
      setPopup(!popup);
      console.log("popup : ", popup);
      // setimageData(event.target);
      let imageurl = event.target.src;
      // image = <img alt="Image">

      image = (
        <>
          <button className="closePoppedImagebutton" onClick={closepoppedimage}>
            Close Imgae
          </button>
          <div className="poppedImage">
            <img alt="Image" id="blurBody" src={imageurl}></img>
          </div>
        </>
      );

      setimageData(image);
      console.log("image Data : ", image);
      document.body.filter = "blur(8px)";
    };
    console.log("EditorTextParser");
    // console.log("original Data", data);
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
      if (articleData && articleData && articleData.blocks) {
        for (let i = 0; i < articleData.blocks.length; i++) {
          if (articleData.blocks[i].type === "code") {
            articleData.blocks[i].articleData.code = escapeHTML(
              articleData.blocks[i].articleData.code
            );
          }
        }
      } else {
        escapeHTML("<h1>No Data is Present here</h1>");
      }
    } catch (error) {
      escapeHTML("<h1>No Data is Present here Yet</h1>");
    }
    const html = edjsParser.parse(articleData);
    // let finalData = parse(html);
    // Use html-react-parser's `replace` method to dynamically add behavior to <img> tags
    const finalData = parse(html, {
      replace: (domNode) => {
        if (domNode.name === "img") {
          const props = domNode.attribs || {}; // Get attributes for the <img> element
          return (
            <img
              {...props} // Preserve existing attributes like `src`, `alt`
              onClick={imageClicked}
              // style={{ cursor: "pointer" }}
            />
          );
        }
        return undefined; // Return `undefined` to preserve other nodes as-is
      },
    });

    // console.log(finalData);
    return (
      <>
        {popup ? imageData : <></>}
        <div className="text-container">{finalData}</div>;
        {/* <div className="text-container"><h1>lkjsnhdvfkjnabdncjsdknfckjln</h1></div>; */}
      </>
    );
  }
}
