import { CloseOutlined } from "@ant-design/icons";
import { Checkbox, Space } from "antd";
import classNames from "classnames";
import React, { FC, useCallback } from "react";
import type { TTodo } from "../../store/Todo/TodoStore";
import { Divider } from "../Divider/Divider";
import { TodoStyle } from "./Todo.style";

const { wrapper, completed } = TodoStyle;

interface ITodoProps extends TTodo {
  onRemove: (ids: TTodo["id"][]) => void;
  onCheck: (id: TTodo["id"]) => void;
}

export const Todo: FC<ITodoProps> = ({ id, title, isComplete, onRemove, onCheck }) => {
  const handleRemoveTodo = useCallback(() => {
    onRemove([id]);
  }, [id, onRemove]);

  const handleCheckTodo = useCallback(() => {
    onCheck(id);
  }, [id, onCheck]);

  return (
    <>
      <Divider />
      <div className={wrapper}>
        <Space size={12}>
          <Checkbox onChange={handleCheckTodo} />
          <span className={classNames({ [completed]: isComplete })}>{title}</span>
        </Space>
        <Space size={12}>
          {/* <EditOutlined /> */}
          <CloseOutlined onClick={handleRemoveTodo} />
        </Space>
      </div>
    </>
  );
};
