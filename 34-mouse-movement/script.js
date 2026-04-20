import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

import gsap from "https://esm.sh/gsap";
import { useGSAP } from "https://esm.sh/@gsap/react";

const { useRef } = React;

function App() {
  const xTo = useRef();
  const yTo = useRef();
  const app = useRef();

  const { context, contextSafe } = useGSAP(() => {
    xTo.current = gsap.quickTo(".flair", "x", { duration: 0.8, ease: "power3" }),
    yTo.current = gsap.quickTo(".flair", "y", { duration: 0.8, ease: "power3" });
  }, { scope: app });

  const moveShape = contextSafe(e => {
    xTo.current(e.clientX);
    yTo.current(e.clientY);
  });

  return /*#__PURE__*/(
    React.createElement("div", { className: "app", ref: app, onMouseMove: e => moveShape(e) }, /*#__PURE__*/
    React.createElement("p", null, "Move your mouse around"), /*#__PURE__*/
    React.createElement("div", { className: "flair" })));


}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));