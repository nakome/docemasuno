import { Container, Title, Text, List } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

// Used for languages
import { Languages } from "../config/Lang";

export default function About() {
  // Used for languages
  const [value] = useLocalStorage({ key: 'language', defaultValue: 'en' });
  const Lang = name => Languages[value][name];
  let linkStyle = {color: "gray"}
  return (
    <Container>
      <Title color="teal.5" my="xl" order={1} >{Lang("about_title")}</Title>
      <Text size="lg" mb={10}>{Lang("about_txt")}</Text>
      <Title order={3} color="teal.8" my="xl">{Lang("about_subtitle")}: </Title>
      <List spacing="xs" my="xl" withPadding>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://mantine.dev/">mantine.dev</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://tabler.io/">tabler.io</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://github.com/uiwjs/react-md-editor">@uiw/react-md-editor</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://github.com/uiwjs/react-textarea-code-editor">@uiw/react-textarea-code-editor</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://day.js.org/">day.js</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://deta.space/">deta.space</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://npm.im/wouter">npm.im/wouter</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://react.dev/">react.dev</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://vitejs.dev">vitejs.dev</a></List.Item>
        <List.Item><a style={linkStyle} rel="noopener" target="_blank" href="https://favicon.io/favicon-converter/">favicon.io</a></List.Item>
      </List>
    </Container>
  );
}
