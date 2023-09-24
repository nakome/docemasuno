import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import MDEditor from "@uiw/react-md-editor";
import CodeEditor from "@uiw/react-textarea-code-editor";

// Used for languages
import { Languages } from "../../config/Lang";

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
  return props.data.category === "markdown" ? (
    <MDEditor preview="edit" height={500} value={props.content} onChange={props.setContent} />
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
  );
}
