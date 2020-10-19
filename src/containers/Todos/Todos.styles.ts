import { style } from "typestyle";

export const TodoListStyles = {
  wrapperStyle: style({
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#378fe6",
  }),
  wrapperTodoListStyle: style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "4px",
    width: "600px",
    backgroundColor: "white",
    height: "360px",
    maxHeight: "360px",
    padding: "8px",
    justifyContent: "space-between",
    $nest: {
      "&>*": {
        marginTop: "12px",
        width: "100%",
      },
      "*:first-child": {
        marginTop: "0px",
      },
    },
  }),
  titleStyle: style({
    display: "flex",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
  }),
  todoListStyle: style({
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
    minHeight: "130px",
    maxHeight: "200px",
    overflowX: "hidden",
    overflowY: "auto",
  }),
  addTodoStyle: style({
    display: "flex",
    width: "100%",
  }),
  addTodoButton: style({
    marginLeft: "12px",
  }),
  bottomPanel: style({
    display: "flex",
    width: "100%",
    alignItems: "center",
  }),
  removeCheckedTodo: style({
    marginLeft: "12px",
  }),
};
