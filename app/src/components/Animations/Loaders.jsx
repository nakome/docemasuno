import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import ContentLoader from "react-content-loader"


export const CardLoader = (props) => {
  const theme = useMantineTheme();
  return (<ContentLoader
    viewBox="0 0 260 150"
    backgroundColor={theme.colors.gray[1]}
    foregroundColor={theme.colors.gray[2]}
    {...props}
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="13" />
    <rect x="0" y="32" rx="4" ry="4" width="255" height="6" />
    <rect x="215" y="0" rx="9" ry="9" width="15" height="13" />
    <rect x="237" y="0" rx="10" ry="10" width="15" height="13" />
    <rect x="0" y="55" rx="10" ry="10" width="90" height="17" />
    <rect x="165" y="55" rx="10" ry="10" width="90" height="17" />
    <rect x="0" y="89" rx="10" ry="10" width="259" height="30" />
  </ContentLoader>)
};

export const CardLoaderLines = (props) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  return width < 700 ? (<ContentLoader
    viewBox="0 0 240 30"
    backgroundColor={theme.colors.gray[1]}
    foregroundColor={theme.colors.gray[2]}
    {...props}
  >
    <rect x="0" y="10" rx="8" ry="8" width="100" height="15" />
    <rect x="200" y="10" rx="8" ry="8" width="15" height="15" />
    <rect x="225" y="10" rx="8" ry="8" width="15" height="15" />
  </ContentLoader>
  ) : (
    <ContentLoader
      viewBox="0 0 240 15"
      backgroundColor={theme.colors.gray[1]}
      foregroundColor={theme.colors.gray[2]}
      {...props}
    >
      <rect x="0" y="10" rx="4" ry="4" width="50" height="5" />
      <rect x="225" y="10" rx="4" ry="4" width="5" height="5" />
      <rect x="235" y="10" rx="4" ry="4" width="5" height="5" />
    </ContentLoader>
  )
};

export const SettingLoader = (props) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  return width < 700 ? (
    <ContentLoader
      viewBox="0 0 445 200"
      backgroundColor={theme.colors.gray[1]}
      foregroundColor={theme.colors.gray[2]}
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
      backgroundColor={theme.colors.gray[1]}
      foregroundColor={theme.colors.gray[2]}
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
  return width < 700 ? (
    <ContentLoader
      viewBox="0 0 300 400"
      backgroundColor={theme.colors.gray[1]}
      foregroundColor={theme.colors.gray[2]}
      {...props}
    >
      <rect x="0" y="0" rx="5" ry="5" width="300" height="400" />
    </ContentLoader>
  ) : (
    <ContentLoader
      viewBox="0 0 300 200"
      backgroundColor={theme.colors.gray[1]}
      foregroundColor={theme.colors.gray[2]}
      {...props}
    >
      <rect x="0" y="0" rx="5" ry="5" width="300" height="200" />
    </ContentLoader>
  );
};

export const ViewBinLoader = props => {
  const theme = useMantineTheme();
  return (<ContentLoader
    viewBox="0 0 400 245"
    backgroundColor={theme.colors.gray[1]}
    foregroundColor={theme.colors.gray[2]}
    {...props}
  >
    <rect x="0" y="0" rx="4" ry="4" width="400" height="9" />
    <rect x="0" y="16" rx="4" ry="4" width="100" height="8" />
    <rect x="0" y="35" rx="4" ry="4" width="400" height="10" />
    <rect x="0" y="55" rx="4" ry="4" width="400" height="10" />
    <rect x="0" y="73" rx="4" ry="4" width="100" height="10" />
    <rect x="0" y="93" rx="5" ry="5" width="400" height="150" />
  </ContentLoader>)
}