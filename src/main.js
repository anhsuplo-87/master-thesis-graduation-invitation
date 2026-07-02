import "./style.css";
import { createApp } from "./app";

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = `${import.meta.env.BASE_URL}assets/favicon.png`;
document.head.appendChild(favicon);

document.querySelector("#app").appendChild(createApp());