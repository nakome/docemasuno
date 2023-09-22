import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
const MDEditor = React.lazy(() => import("@uiw/react-md-editor"));
const CodeEditor = React.lazy(() => import("@uiw/react-textarea-code-editor"));
// Used for languages
import { Languages } from "../../config/Lang";
// Componentes
import { EditorLoader } from "../Animations/Loaders";
/**
 * Form editor
 * @param {object} props
 */
export default function FormEditor(props) {
  // Used for languages
  const [value] = useLocalStorage({ key: "language", defaultValue: "en" });
  const Lang = (name) => Languages[value][name];
  // Theme colors
  const theme = useMantineTheme();
  // Swith editor
  return <React.Suspense fallback={<EditorLoader/>}> 
    {props.data.category === "markdown" ? (
        <MDEditor
          height={500}
          value={props.content}
          onChange={props.setContent}
        />
    ) : (
        <CodeEditor
          value={props.content}
          language={props.data.category}
          placeholder={Lang("enter_the_code")}
          onChange={(evn) => props.setContent(evn.target.value)}
          padding={15}
          minHeight={350}
          style={{
            minHeight: 350,
            fontSize: 14,
            border:
              theme.colorScheme === "dark"
                ? `1px solid ${theme.colors.dark[3]}`
                : `1px solid ${theme.colors.gray[3]}`,
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          }}
        />
    )}
  </React.Suspense>;
}
