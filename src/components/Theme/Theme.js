import "./Theme.css";
import { ThemeContext } from "./ThemeProvider";
import { useContext, useState } from "react";
function Theme(props) {
  // console.log("Theme");
  const [SunIsAt, setSunIsAt] = useState("left");
  const { theme } = useContext(ThemeContext);
  function handelThemebuttonClick() {
    props.toggleTheme();
    moveTheSun();
  }
  function moveTheSun() {
    // console.log(SunIsAt);
    SunIsAt === "left" ? setSunIsAt("right") : setSunIsAt("left");
  }
  return (
    <>
      <span
        className={`ThemeElement ${
          SunIsAt === "left" ? "ThemeElementleft" : "ThemeElementRight"
        }`}
        onClick={handelThemebuttonClick}
      ></span>
    </>
  );
}
export default Theme;
