import { useEffect, useRef } from "react";

/**
 * Hook, that returns the last used value.
 */

// this is from react FAQ's
// store any variable and in the next render of the  component check to see if it has changed from the last render
// this is something that could do previouly in class component easliy but not so easy with funcitonal compoents

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
// import this into the BrushChart
