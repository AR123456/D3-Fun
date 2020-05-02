import { useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";
//the useResizeObserver function recives a reference to an element

const useResizeObserver = (ref) => {
  // initially there are no dimensions in state.
  //setDimensions will be used by ResizeObserver when the ref being
  //observed changes.
  const [dimensions, setDimensions] = useState(null);
  // ResizeObserver needs a DOM element to observe.
  //we are using a useRef hook to observe to define our const svgRef
  // svgRef is passed it the return to the svg
  useEffect(() => {
    // need to define what is to be observed
    // console.log(ref.current);
    const observeTarget = ref.current;
    // define the resizeObserver as a new
    // in the callback pass entries which are being observed
    // and resized as an argument. Entries is an array
    const resizeObserver = new ResizeObserver((entries) => {
      // console.log(entries);
      entries.forEach((entry) => {
        // for each entry call the setDimensions function
        // pass the entire contentRect object to
        // store them in the use state hook
        setDimensions(entry.contentRect);
      });
    });
    // telling resizeObserver what to observe
    resizeObserver.observe(observeTarget);
    return () => {
      // this is a clean up function
      // will be called when the component using
      // the resizeObserve hook is getting removed
      // or un mounted
      resizeObserver.unobserve(observeTarget);
    };
    // ref is a dependancy to the use effect hook
  }, [ref]);
  // returns the width and height that have been set by the ResizeObserver API and the useState hook
  return dimensions;
};
export default useResizeObserver;
