import React from "react";
import { useMantineTheme } from "@mantine/core";

import "./index.css";

export const CardLoader = (props) => {
  const theme = useMantineTheme();
  const style = {
    fill: theme.colors.gray[1],
    strokeWidth: 2,
    stroke: theme.colors.gray[1],
    strokeLinejoin: "round",
  };
  return (
    <svg class="flash" xmlns="http://www.w3.org/2000/svg" viewBox="-3 -8 260 130" width="100%" height="100%">
      <rect style={style} x="0" y="0" rx="4" ry="4" width="197" height="13" />
      <rect style={style} x="0" y="30" rx="4" ry="4" width="150" height="10" />
      <rect style={style} x="210" y="0" rx="10" ry="10" width="15" height="13" />
      <rect style={style} x="237" y="0" rx="10" ry="10" width="15" height="13" />
      <rect style={style} x="0" y="55" rx="10" ry="10" width="90" height="17" />
      <rect style={style} x="155" y="55" rx="10" ry="10" width="100" height="17" />
      <rect style={style} x="0" y="89" rx="10" ry="10" width="254" height="30" />
    </svg>
  );
};

export const CardLoaderLines = (props) => {
  const theme = useMantineTheme();
  const style = {
    fill: theme.colors.gray[1],
    strokeWidth: 2,
    stroke: theme.colors.gray[1],
    strokeLinejoin: "round",
  };
  return (
    <svg class="flash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 18" width="100%" height="100%">
      <rect style={style} x="0" y="10" rx="4" ry="4" width="215" height="5" />
      <rect style={style} x="225" y="10" rx="4" ry="4" width="5" height="5" />
      <rect style={style} x="235" y="10" rx="4" ry="4" width="5" height="5" />
    </svg>
  );
};

export const SettingLoader = () => {
  const theme = useMantineTheme();
  return (
    <svg
      className="flash"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 50"
      width="100%"
      height="150px"
    >
      <rect x="0" y="0" width="125" height="20" fill={theme.colors.gray[2]} />
      <rect x="0" y="25" width="125" height="20" fill={theme.colors.gray[2]} />
      <rect x="135" y="0" width="120" height="45" fill={theme.colors.gray[2]} />
    </svg>
  );
};

export const EditorLoader = () => {
  const theme = useMantineTheme();
  const lineStyle = { stroke: "none", fill: theme.colors.gray[2], strokeMiterLimit: 10 }
  return (
    <svg
      className="flash"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 355 150"
      width="100%"
      height="350px"
    >
    <rect style={lineStyle} x="0" y="0" rx="2" ry="2" width="350" height="150" />
    </svg>
  );
};

export const ViewBinLoader = props => {
  const theme = useMantineTheme();
  const lineStyle = { stroke: "none", fill: theme.colors.gray[2], strokeMiterLimit: 10 }
  return (<svg
    className="flash"
    viewBox="0 -13 400 600"
    height="100%"
    width="100%"
  >
    <rect style={lineStyle} x="0" y="0" rx="4" ry="4" width="400" height="9" />
    <rect style={lineStyle} x="0" y="16" rx="4" ry="4" width="100" height="8" />
    <rect style={lineStyle} x="0" y="35" rx="4" ry="4" width="400" height="10" />
    <rect style={lineStyle} x="0" y="55" rx="4" ry="4" width="400" height="10" />
    <rect style={lineStyle} x="0" y="73" rx="4" ry="4" width="100" height="10" />
    <rect style={lineStyle} x="0" y="93" rx="5" ry="5" width="400" height="150" />
  </svg>)
}