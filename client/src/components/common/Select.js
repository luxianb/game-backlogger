import ReactSelect from "react-select";
import { hexToRGBA } from "../../utils/tools";
/** @type ReactSelect */
export const Select = (props) => {
  const getTheme = (defaultTheme) => {
    const theme = {
      ...defaultTheme,
      borderRadius: 4,
      colors: {
        danger: "#DE350B",
        dangerLight: "#FFBDAD",
        neutral0: hexToRGBA("#263238", 1), // background color, selected-text-color
        neutral5: hexToRGBA("#ffffff", 0.95),
        neutral10: hexToRGBA("#ffffff", 0.9),
        neutral20: hexToRGBA("#ffffff", 0.5), // bordercolor + chevron
        neutral30: hexToRGBA("#ffffff", 0.7), // hover-hightlight
        neutral40: hexToRGBA("#ffffff", 0.6), // options text
        neutral50: hexToRGBA("#ffffff", 0.5), // placeholder
        neutral60: hexToRGBA("#ffffff", 0.4), // hover-chevron
        neutral70: hexToRGBA("#ffffff", 0.3),
        neutral80: hexToRGBA("#ffffff", 0.8), // text-color
        neutral90: hexToRGBA("#ffffff", 0.1),
        primary: "#2196f3",
        primary25: "#1e88e5", // options highlight
        primary50: "#1976d2",
        primary75: "#1565c0",
      },
      spacing: {
        baseUnit: 4,
        controlHeight: 38,
        menuGutter: 0, // default 8
      },
    };
    return theme;
  };

  return (
    <ReactSelect
      styles={{
        control: (styles, state) => ({ ...styles, border: 0, minWidth: 150 }),
        indicatorSeparator: (styles, state) => ({ ...styles, display: "none" }),
        menu: (styles, state) => ({ ...styles, zIndex: 2 }),
      }}
      theme={getTheme}
      {...props}
    />
  );
};
