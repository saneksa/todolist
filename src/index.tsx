import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import ruRu from "antd/es/locale/ru_RU";
import { configure } from "mobx";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TodoList from "./containers/Todos/Todos";
import "./index.styles";

configure({
  useProxies: "ifavailable",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const App = () => {
  return (
    <ConfigProvider locale={ruRu}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true}>
            <TodoList />
          </Route>
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};

render(<App />, document.getElementById("root"));
