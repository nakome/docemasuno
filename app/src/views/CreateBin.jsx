import React from "react";
import {
  useMantineTheme,
  Container,
  Group,
  Space,
  Button
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Base } from "deta";
import { navigate } from "wouter/use-location";
import {
  IconDeviceFloppy,
  IconArrowLeft,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";


import { today } from "../utils/Date";
// Used for languages
import { Languages } from "../config/Lang";
// Form lazy components
const FormSettings = React.lazy(() => import("../components/FormSettings"));
const FormEditor = React.lazy(() => import("../components/FormEditor"));

/**
 * CreateBin
 */
export default function CreateBin() {
  // Used for languages
  const [value] = useLocalStorage({ key: "language", defaultValue: "en" });
  const Lang = (name) => Languages[value][name];

  const [loadingAdd, setLoadingAdd] = React.useState(false);

  // Back to home
  const backToView = () => navigate("/");

  // Theme for colors
  const theme = useMantineTheme();

  // Content editor
  const [content, setContent] = React.useState("console.log('document')");

  // Default data create
  const defaultData = {
    title: Lang("default_title"),
    description: Lang("default_description"),
    category: "text",
    content: "",
    lastModified: today(),
    creationDate: today(),
    pinned: false,
    published: false,
  }

  // Data
  const [data, setData] = React.useState(defaultData);

  // Messages for notifications
  const Messages = {
    success: {
      title: Lang("success"),
      message: Lang("msg_data_created"),
      autoClose: 2000,
      withCloseButton: false,
    },
    error:{
      title: Lang("error"),
      message: Lang("msg_error_fetch"),
      autoClose: 2000,
      withCloseButton: false,
    }
  }

  // Deta
  const Db = Base("bins");

  // Update states
  const updateState = (key, val) => setData({ ...data, [key]: val });

  /**
   * Create bin
   */
  async function createBin() {
    setLoadingAdd(true);
    if (data.title) {
      data.content = content;
      try {
        let response = await Db.insert(data);
        notifications.show(Messages.success);
        navigate(`/view/${response.key}`);
      } catch (error) {
        notifications.show(Messages.error);
        console.error("Error on create:", error);
      } finally {
        setLoadingAdd(false);
      }
    } else {
      setLoadingAdd(false);
    }
  }

  return (
    data && (
      <Container fluid data-color-mode={theme.colorScheme === "dark" ? "dark" : "light"} >
        <Group position="apart" mt="md" mb="xs">
          <Button leftIcon={<IconArrowLeft size="1rem" />} variant="light" color="teal" onClick={backToView}>
            {Lang("back_to_home")}
          </Button>
          <Button loading={loadingAdd} leftIcon={<IconDeviceFloppy size="1rem" />} variant="light" onClick={createBin}>
            {Lang("create")}
          </Button>
        </Group>
        <Space h={10} />
        <React.Suspense fallback={<>🚀 load settings</>}>
          <FormSettings data={data} updateState={updateState} />
        </React.Suspense>
        <Space h="md" />
        <React.Suspense fallback={<>🚀 load editor</>}>
          <FormEditor data={data} content={content} setContent={setContent} />
        </React.Suspense>
      </Container>
    )
  );
}
