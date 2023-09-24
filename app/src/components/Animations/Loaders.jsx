import React from "react";
import { useMantineTheme, LoadingOverlay } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import ContentLoader from "react-content-loader"
import { Dots } from "../../../node_modules/@mantine/core/esm/Loader/loaders/Dots";


export const SettingLoader = (props) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  return width < 700 ? (
    <ContentLoader
      viewBox="0 0 445 200"
      backgroundColor={theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}
      foregroundColor={theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1]}
      {...props}
    >
      <rect x="0" y="0" rx="4" ry="4" width="90" height="20" />
      <rect x="355" y="0" rx="4" ry="4" width="90" height="20" />

      <rect x="0" y="25" rx="5" ry="5" width="445" height="30" />
      <rect x="0" y="65" rx="5" ry="5" width="445" height="30" />
      <rect x="0" y="100" rx="5" ry="5" width="445" height="100" />

    </ContentLoader>
  ) : (
    <ContentLoader
      viewBox="0 0 445 80"
      backgroundColor={theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}
      foregroundColor={theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1]}
      {...props}
    >
      <rect x="0" y="0" rx="4" ry="4" width="90" height="20" />
      <rect x="355" y="0" rx="4" ry="4" width="90" height="20" />

      <rect x="0" y="25" rx="5" ry="5" width="215" height="20" />
      <rect x="0" y="55" rx="5" ry="5" width="215" height="20" />
      <rect x="230" y="25" rx="5" ry="5" width="215" height="50" />

    </ContentLoader>
  );
};

export const EditorLoader = (props) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const backgroundColor = theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1];
  const foregroundColor = theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1];
  const commonProps = {
    backgroundColor,
    foregroundColor,
    ...props
  };
  return width < 700 ? (
    <ContentLoader
      viewBox="0 0 300 400"
      {...commonProps}
    >
      <rect x="0" y="0" rx="5" ry="5" width="300" height="400" />
    </ContentLoader>
  ) : (
    <ContentLoader
      viewBox="0 0 300 200"
      {...commonProps}
    >
      <rect x="0" y="0" rx="5" ry="5" width="300" height="200" />
    </ContentLoader>
  );
};

export const ViewBinLoader = props => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();

  let componentProps = {
    style: { margin: "5px" },
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[1],
    foregroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
    ...props
  }
  return width < 700 ? (<ContentLoader
    viewBox="0 0 400 500"
    {...componentProps}
  >
    <rect x="0" y="5" rx="4" ry="4" width="100" height="10" />
    <rect x="0" y="25" rx="4" ry="4" width="160" height="8" />
    <rect x="0" y="45" rx="4" ry="4" width="100" height="15" />
    <rect x="300" y="45" rx="4" ry="4" width="100" height="15" />
    <rect x="0" y="70" rx="5" ry="5" width="400" height="300" />
  </ContentLoader>) : (<ContentLoader
    viewBox="0 0 400 260"
    {...componentProps}
  >
    <rect x="0" y="5" rx="4" ry="4" width="100" height="9" />
    <rect x="0" y="20" rx="4" ry="4" width="130" height="8" />
    <rect x="0" y="35" rx="4" ry="4" width="100" height="10" />
    <rect x="300" y="35" rx="4" ry="4" width="100" height="10" />
    <rect x="0" y="55" rx="5" ry="5" width="400" height="190" />
  </ContentLoader>)
}

export const Preloader = (props) => (
  <LoadingOverlay
    visible={true}
    zIndex={1000}
    loaderProps={{ color: "teal", component: Dots }}
  />
);
