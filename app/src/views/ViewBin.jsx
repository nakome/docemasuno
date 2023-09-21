import React from "react";
import {
  useMantineTheme,
  Container,
  LoadingOverlay,
  Text,
  Title,
  Space,
  Badge,
  Group,
  ActionIcon,
  Menu
} from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { modals } from '@mantine/modals'
import { Base } from "deta";
import { navigate } from "wouter/use-location";
import { IconDotsVertical, IconEyeCheck, IconEyeClosed, IconPinned, IconPinnedOff, IconWorldShare, IconEdit, IconTrash } from "@tabler/icons-react";

// Component  link to
import LinkTo from "../components/LinkTo";
// Utils
import { toFullDate } from "../utils/Date";
// Not found
import NotFound from "./NotFound";
// Used for languages
import { Languages } from "../config/Lang";
// Editor lazy
import MDEditor from "@uiw/react-md-editor";
/**
 * View bin
 * @param {object} params
 */
export default function ViewBin({ params }) {
  // Used for languages
  const [value] = useLocalStorage({ key: "language", defaultValue: "en" });
  const Lang = (name) => Languages[value][name];
  // Theme
  const theme = useMantineTheme();
  // Data states
  const [data, setData] = React.useState({});
  // loader views
  const [visible, setVisible] = React.useState(true);
  // Init Deta
  const Db = Base("bins");

  React.useEffect(() => {loadViewData();}, []);

  // Edit code
  const editCode = (key) => navigate(`/edit/${params.key}`);
  // Update states
  const updateState = (key, val) => setData({ ...data, [key]: val });

  // Toggle pinned
  const handlePinned = React.useCallback(async (evt) => {
    evt.preventDefault();
    const newData = { ...data };
    newData.pinned = !data.pinned;
    updateState("pinned", newData.pinned);
    const response = await Db.put(newData, data.key);
    if (response.title) {
      notifications.show({
        title: Lang("success"),
        message: `${Lang("change_state")} ${response.pinned ? Lang('pinned') : Lang('unpinned')}`,
        autoClose: 2000,
        withCloseButton: false,
      });
    }
  }, [data]);

  // Toggle published
  const handlePublished = React.useCallback(async (evt) => {
    evt.preventDefault();
    try {
      const newData = { ...data, published: !data.published };
      const response = await Db.put(newData, data.key);
      if (response.title) {
        updateState("published", newData.published);
        notifications.show({
          title: Lang("success"),
          message: `${Lang("change_state")} ${response.published ? Lang('published') : Lang('unpublished')}`,
          autoClose: 2000,
          withCloseButton: false,
        });
      }
    } catch (error) {
      // handle error
    }
  }, [data, Db, Lang, notifications, updateState]);


  const Messages = {
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

  const handleDelete = async () => {
    try {
      modals.openConfirmModal({
        title: Lang("are_you_sure"),
        children: (
          <Text size="sm">
            {Lang("are_you_sure")}
          </Text>
        ),
        labels: { confirm: Lang("delete"), cancel: Lang("cancel") },
        onConfirm: async () => {
          await Db.delete(data.key);
          notifications.show(Messages.deleted);
          navigate("/");
        }
      });
    } catch (error) {
      notifications.show(Messages.deletedErr);
      notifications.show({ message: error });
    }
  };


  // Share links
  const handleShareLink = React.useCallback(() => {
    let url = `${location.origin}/api/share/${data.key}`;
    window.open(url, '_blank');
  },[data]);

  // Load data
  async function loadViewData() {
    const response = await Db.get(params.key);
    setData(response);
    setVisible(false);
  }

  return data ? (
    <Container fluid data-color-mode={theme.colorScheme === "dark" ? "dark" : "light"}>
      <LoadingOverlay visible={visible} overlayBlur={2} color="teal" />
      <Group position="apart" mt="md" mb="xs">
        <Title order={1} size={20} color="teal.5">{data.title}</Title>
        <Group gap="xs">
          <Menu shadow="md" width={150} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="light">
                <IconDotsVertical size="1rem" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{Lang('application')}</Menu.Label>
              <Menu.Item onClick={editCode} rightSection={<IconEdit size="1rem" color={theme.colors.gray[5]} />}> {Lang("edit")} </Menu.Item>
              <Menu.Item onClick={handlePublished} rightSection={(data.published) ? (<IconEyeCheck size="1rem" color={theme.colors.blue[5]} />) : (<IconEyeClosed size="1rem" color={theme.colors.gray[5]} />)}> {Lang("access")} </Menu.Item>
              <Menu.Item onClick={handlePinned} rightSection={(data.pinned) ? (<IconPinned size="1rem" color={theme.colors.blue[5]} />) : (<IconPinnedOff size="1rem" color={theme.colors.gray[5]} />)}>{Lang("pin")}</Menu.Item>
              {(data.published) ? (
                <Menu.Item
                  onClick={handleShareLink}
                  color="blue.5"
                  rightSection={<IconWorldShare size="1rem" />}>
                  {Lang("share_link")}
                </Menu.Item>
              ) : ("")}
              <Menu.Divider />
              <Menu.Label>{Lang('danger_zone')}</Menu.Label>
              <Menu.Item color="red.5" onClick={handleDelete} rightSection={<IconTrash size="1rem" />}> {Lang('delete')} </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      <Space h={3} />
      <Text size="sm" color={(theme) => (theme.colorScheme === "dark" ? "light" : "dark.5")}>{data.description}</Text>
      <Space h={3} />
      <Group position="apart" mt="md" mb="xs">
        <Badge color="violet">
          <LinkTo query={data.category} name={data.category} />
        </Badge>
        <Badge color="grape">{toFullDate(value,data.lastModified)}</Badge>
      </Group>
      <Space h={10} />
      {data.category === "markdown" ? (
        <MDEditor.Markdown
          source={data.content}
          height={420}
          style={{
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : "#fff",
          }}
        />
      ) : (
        <Prism
          style={{
            backgroundColor:
              theme.colorScheme === "dark" ? "" : theme.colors.gray[0],
          }}
          language={"tsx"}
          colorScheme={theme.colorScheme === "dark" ? "dark" : "light"}
        >
          {data.content ? data.content : ""}
        </Prism>
      )}
    </Container>
  ) : (
    <NotFound />
  );
}
