import { useEffect, useRef, useState } from "react";

// const getField = (direction) => {
//   switch (direction) {
//     case "width":
//       return "offsetWidth";
//     // return "clientWidth";
//     case "height":
//     default:
//       return "offsetHeight";
//     // return "clientHeight";
//   }
// };

export const useElementSize = (direction) => {
  const ref = useRef();
  const [size, setSize] = useState(null);
  // const field = getField(direction);

  useEffect(
    () => {
      calculateSize();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    // , [ref?.current?.offsetHeight, ref?.current?.offsetWidth]
  );

  useEffect(() => {
    window.addEventListener("resize", calculateSize);
    return () => {
      window.removeEventListener("resize", calculateSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  const calculateSize = () => {
    if (!ref.current) return;
    let eleSize;
    switch (direction) {
      case "all":
        eleSize = {
          height: ref.current.offsetHeight.toFixed(2),
          width: ref.current.offsetWidth.toFixed(2),
        };
        break;
      case "width":
        eleSize = ref.current.offsetWidth.toFixed(2);
        break;
      case "height":
      default:
        eleSize = ref.current.offsetHeight.toFixed(2);
        break;
    }
    // const eleSize = ref.current[field].toFixed(2);
    if (JSON.stringify(size) !== JSON.stringify(eleSize)) {
      setSize(eleSize);
    }
  };

  return [ref, size];
};
