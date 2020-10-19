import { style } from "typestyle";

export const TodoStyle = {
  wrapper: style({
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "space-between",
    height: "34px",
    padding: "0px 6px",
    $nest: {
      "&:hover": {
        backgroundColor: "#e0f0ff",
      },
    },
  }),
  completed: style({
    textDecoration: "line-through",
  }),
};
