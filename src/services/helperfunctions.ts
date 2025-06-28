// getting colors for category
export const getCategoryColors = (categoryName: string) => {
  switch (categoryName) {
    case "supermarket":
      return {
        primary: "#1447e6",
        secondary: "#0d3cc7",
        light: "#e3f2fd",
        text: "#1447e6",
      };
    case "marketplace":
      return {
        primary: "#f48fb1",
        secondary: "#e91e63",
        light: "#fce4ec",
        text: "#c2185b",
      };
    case "pharmacy":
      return {
        primary: "#00d492",
        secondary: "#00a673",
        light: "#e8f5e8",
        text: "#00a673",
      };
    case "restaurant":
      return {
        primary: "#ec5949",
        secondary: "#d44439",
        light: "#ffebee",
        text: "#d44439",
      };
    case "fastfood":
      return {
        primary: "#ff8904",
        secondary: "#e67300",
        light: "#fff3e0",
        text: "#e67300",
      };
    case "hotel":
      return {
        primary: "#00d3f2",
        secondary: "#00b8d4",
        light: "#e0f7fa",
        text: "#00b8d4",
      };
    default:
      return {
        primary: "#ff8904",
        secondary: "#e67300",
        light: "#fff3e0",
        text: "#e67300",
      };
  }
};