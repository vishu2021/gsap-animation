import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

import gsap from "https://esm.sh/gsap";
//import { useGSAP } from "https://esm.sh/@gsap/react";
const { useEffect, useLayoutEffect, useRef, useState, useCallback } = React;

console.clear();

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect,
isConfig = value => value && !Array.isArray(value) && typeof value === "object",
emptyArray = [],
defaultConfig = {};

const useGSAP = (callback, dependencies = emptyArray) => {
  let config = defaultConfig;
  if (isConfig(callback)) {
    config = callback;
    callback = null;
    dependencies = "dependencies" in config ? config.dependencies : emptyArray;
  } else if (isConfig(dependencies)) {
    config = dependencies;
    dependencies = "dependencies" in config ? config.dependencies : emptyArray;
  }
  let { scope, revertOnUpdate } = config,
  [mounted, setMounted] = useState(false);
  callback && typeof callback !== "function" && console.warn("First parameter must be a function or config object");
  const context = gsap.context(() => {}, scope),
  contextSafe = func => context.add(null, func),
  cleanup = () => context.revert(),
  deferCleanup = dependencies && dependencies.length && !revertOnUpdate;
  useIsomorphicLayoutEffect(() => {
    callback && context.add(callback, scope);
    if (!deferCleanup || !mounted) {// React renders bottom-up, thus there could be hooks with dependencies that run BEFORE the component mounts, thus cleanup wouldn't occur since a hook with an empty dependency Array would only run once the component mounts.
      return cleanup;
    }
  }, dependencies);
  deferCleanup && useIsomorphicLayoutEffect(() => {
    setMounted(true);
    return cleanup;
  }, emptyArray);
  return { context, contextSafe };
};

const randomX = gsap.utils.random(-200, 200, 1, true);

function Box({ endX }) {
  const revert = useRef();

  // useGSAP(() => {
  //   gsap.to(revert.current, {
  //     x: endX,
  //     duration: 1,
  //     delay:0.2, // short delay so we can see the animation 'reset'
  //   });
  // }, { dependencies: [endX], revertOnUpdate: true }); // the animation gets reverted every time the prop changes

  return /*#__PURE__*/React.createElement("div", { ref: revert, className: "box gradient-blue" }, "reverted");
}

function Circle({ endX }) {
  const noRevert = useRef();

  useGSAP(() => {
    gsap.to(noRevert.current, {
      x: endX,
      duration: 1,
      delay: 0.2 // short delay for demo purposes
    });
  }, [endX]); // the animation retains it's current value and doesn't get reverted when the prop changes

  return /*#__PURE__*/React.createElement("div", { ref: noRevert, className: "circle gradient-green" }, "not reverted");
}

function App() {
  const [endX, setEndX] = useState(0);

  return /*#__PURE__*/(
    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => setEndX(randomX()) }, "Pass in a randomized value : ",
    endX), /*#__PURE__*/

    React.createElement(Box, { endX: endX }, endX), /*#__PURE__*/
    React.createElement(Circle, { endX: endX }, endX)));


}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));