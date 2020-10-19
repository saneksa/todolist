import { Divider as AntDivider } from "antd";
import React from "react";
import { DividerStyle } from "./Divider.style";

const { common } = DividerStyle;

export const Divider = () => <AntDivider className={common} />;
