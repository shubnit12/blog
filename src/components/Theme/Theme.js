import "./Theme.css";
import { useState } from "react";

function Theme() {
  const [count, setCount] = useState(1);
  function changeTheme() {
    const element = document.querySelector(".ThemeElement");
    element.addEventListener("click", () => {
      if (count % 2 === 0) {
        // element.style.animationIterationCount = count;
        element.style.transform = "translateX(1vw) rotate(0deg) ";
        element.style.animationIterationCount = "1";
        element.style.animationName = "ocilate";
        element.style.backgroundColor = "rgb(252, 151, 19)";
        setTimeout(() => {
          element.style.boxShadow = "0px 0px 30px 10px rgb(248, 217, 15)";
        }, 1000);
      } else {
        // element.style.animationIterationCount = count;
        element.style.backgroundColor = "transparent";
        element.style.transform = "translateX(93vw) rotate(0deg) ";
        element.style.animationIterationCount = "1";
        element.style.animationName = "ocilate";
        setTimeout(() => {
          element.style.boxShadow = "-11px 11px 0 0 rgb(169, 170, 167)";
        }, 1000);
      }
      setTimeout(() => {
        element.style.animationName = "";
      }, 2000);
      setCount(count + 1);
      console.log(count);
    });
  }
  return (
    <>
      <span className="ThemeElement" onClick={changeTheme}></span>
    </>
  );
}

export default Theme;
