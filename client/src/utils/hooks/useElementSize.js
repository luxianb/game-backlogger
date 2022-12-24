import { useEffect, useRef, useState } from "react";

const getField = (direction) => {
  switch (direction) {
    case "width":
      return "offsetWidth";
    // return "clientWidth";
    case "height":
    default:
      return "offsetHeight";
    // return "clientHeight";
  }
};

export const useElementSize = (direction) => {
  const ref = useRef();
  const [size, setSize] = useState(null);
  const field = getField(direction);

  useEffect(() => {
    calculateSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current?.offsetHeight, ref?.current?.offsetWidth]);

  useEffect(() => {
    window.addEventListener("resize", calculateSize);
    return () => {
      window.removeEventListener("resize", calculateSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateSize = () => {
    if (!ref.current) return;
    const eleSize = ref.current[field].toFixed(2);
    if (size !== eleSize) {
      setSize(eleSize);
    }
  };

  return [ref, size];
};
