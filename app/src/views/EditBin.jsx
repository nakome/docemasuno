import React from "react";
import {
  Tabs,
  useMantineTheme,
  Container,
  LoadingOverlay,
  Group,
  Space,
  Button,
  Text
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { modals } from '@mantine/modals';
import { Base } from "deta";
import { navigate } from "wouter/use-location";
import {
  IconDeviceFloppy,
  IconTrash,
  IconCategory,
  IconArrowLeft,
  IconSettings,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

// Form components
const FormSettings = React.lazy(() => import("../components/FormSettings"));
const FormEditor = React.lazy(() => import("../components/FormEditor"));

// Not found
import NotFound from "./NotFound";

// Languages
import { Languages } from "../config/Lang";

// Utils
import { today } from "../utils/Date";

/**
 * Edit Bin
 * @param {object} params
 */
export default function EditBin({ params }) {
  // Used for languages
  const [value] = useLocalStorage({ key: 'language', defaultValue: 'en' });
  const Lang = name => Languages[value][name];

  // Loading buttons
  const [loadingPut, setLoadingPut] = React.useState(false);
  const [loadingDel, setLoadingDel] = React.useState(false);

  // Used for theme
  const theme = useMantineTheme();

  //  Data states
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState("");

  // loading
  const [visible, setVisible] = React.useState(true);

  // Init Deta
  const Db = Base("bins");

  const Messages = {
    updated: {
      title: Lang("success"),
      message: Lang("msg_data_updated"),
      autoClose: 2000,
      withCloseButton: false,
    },
    deleted:{
      title: Lang("success"),
      message: Lang("msg_data_deleted"),
      autoClose: 2000,
      color: "green",
      withCloseButton: false,
    },
    deletedErr:{
      title: Lang("error"),
      message: Lang("msg_error_fetch"),
      autoClose: 2000,
      color: "red",
      withCloseButton: false,
    }
  }

  React.useEffect(() => {
    loadViewData();
  }, []);

  // Update states
  const updateState = (key, val) => setData({ ...data, [key]: val });
  // Back to home
  const backToView = (key) => navigate(`/view/${data.key}`);

  // Loading  view data
  async function loadViewData() {
    const response = await Db.get(params.key);
    setData(response);
    setContent(response.content);
    setVisible(false);
  }

  // Update bin
  async function updateBin() {
    try {
      setLoadingPut(true)
      if (data.title) {
        data.lastModified = today();
        data.content = content;
        await Db.put(data, data.key);
        notifications.show(Messages.updated);
        setLoadingPut(false);
      }
    } catch (error) {
      setLoadingDel(false)
      notifications.show(Messages.deletedErr);
      notifications.show({message:error});
    }
  }

  function deleteBin() {
    return modals.openConfirmModal({
      title: Lang("are_you_sure"),
      children: (
        <Text size="sm">
          {Lang("are_you_sure")}
        </Text>
      ),
      labels: { confirm: Lang("delete"), cancel: Lang("cancel") },
      onConfirm: async () => {
        try {
          setLoadingDel(true);
          await Db.delete(data.key);
          notifications.show(Messages.deleted);
          navigate("/");
        } catch (error) {
          notifications.show(Messages.deletedErr);
          notifications.show({ message: error });
        } finally {
          setLoadingDel(false);
        }
      },
    });
  }

  return data ? (
    <Container
      fluid
      data-color-mode={theme.colorScheme === "dark" ? "dark" : "light"}
    >
      <LoadingOverlay visible={visible} overlayBlur={2} color="teal" />

      <Group position="apart" mt="md" mb="xs">
        <Group>
          <Button
            leftIcon={<IconArrowLeft size="1rem" />}
            variant="light"
            color="teal"
            onClick={backToView}
          >
            {Lang("back_to_home")}
          </Button>
        </Group>
        <Group>
          <Button
            loading={loadingPut}
            leftIcon={<IconDeviceFloppy size="1rem" />}
            variant="light"
            onClick={updateBin}
          >
            {Lang("update")}
          </Button>
          <Button
            loading={loadingDel}
            leftIcon={<IconTrash size="1rem" />}
            variant="light"
            color={"red"}
            onClick={deleteBin}
          >
            {Lang("delete")}
          </Button>
        </Group>
      </Group>

      <Space h={10} />

      <Tabs color="teal" defaultValue="editor">
        <Tabs.List>
          <Tabs.Tab value="editor" icon={<IconCategory size="0.8rem" />}>
            Editor
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
            Meta
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="editor" pt="xs">
          <React.Suspense fallback={<>🚀</>}>
            <FormEditor data={data} content={content} setContent={setContent} />
          </React.Suspense>
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <React.Suspense fallback={<>🚀</>}>
            <FormSettings data={data} updateState={updateState} />
          </React.Suspense>
        </Tabs.Panel>
      </Tabs>
    </Container>
  ) : (
    <NotFound />
  );
}
