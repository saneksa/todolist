import { CloseOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Progress } from "antd";
import { flow, get, reduce } from "lodash/fp";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { Divider } from "../../components/Divider/Divider";
import { Todo } from "../../components/Todo/Todo";
import { todoStore } from "../../store";
import { TodoListStyles } from "./Todos.styles";

const {
  wrapperStyle,
  wrapperTodoListStyle,
  titleStyle,
  addTodoStyle,
  bottomPanel,
  addTodoButton,
  todoListStyle,
  removeCheckedTodo,
} = TodoListStyles;

const takeInputValue = get(["target", "value"]);

const TodoList = observer(() => {
  const [todoName, setTodoName] = useState("");

  const handleAddTodo = useCallback(() => {
    todoStore.addTodo({
      title: todoName,
      isComplete: false,
    });

    setTodoName("");
  }, [todoName]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !!todoName.trim()) {
        handleAddTodo();
      }
    },
    [handleAddTodo, todoName]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleRemoveCheckedTodos = useCallback(() => {
    const ids = reduce(
      (acc, todo) => (todo.isComplete && acc.push(todo.id), acc),
      [] as number[],
      todoStore.todos
    );

    todoStore.removeTodos(ids);
  }, []);

  const todos = todoStore?.todos.map((todo) => (
    <Todo
      key={todo.id}
      id={todo.id}
      title={todo.title}
      isComplete={todo.isComplete}
      onRemove={todoStore.removeTodos}
      onCheck={todoStore.checkTodo}
    />
  ));

  todos.push(<Divider key="divider" />);

  return (
    <div className={wrapperStyle}>
      <div className={wrapperTodoListStyle}>
        <div className={titleStyle}>TODOLIST</div>
        <div className={addTodoStyle}>
          <Input value={todoName} onChange={flow(takeInputValue, setTodoName)} />
          <Button
            className={addTodoButton}
            type="primary"
            onClick={handleAddTodo}
            children="+"
            disabled={!todoName.trim()}
          />
        </div>

        <div className={todoListStyle}>
          {todoStore.isNotEmptyTodos ? todos : <Empty description="Нет задач" />}
        </div>

        <div className={bottomPanel}>
          <Progress percent={todoStore.completedPercent} />
          <Button
            type="primary"
            icon={<CloseOutlined />}
            onClick={handleRemoveCheckedTodos}
            className={removeCheckedTodo}
            disabled={!todoStore.completedPercent}
          >
            Удалить выбранные
          </Button>
        </div>
      </div>
    </div>
  );
});

export default TodoList;
