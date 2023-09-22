import React from "react";
import {
  useMantineTheme,
  Grid,
  Card,
  Text,
  Badge,
  Group,
  ActionIcon,
  Title,
  Alert,
  Button,
  Space,
} from "@mantine/core";
import { Link } from "wouter";
import { navigate } from "wouter/use-location";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconPinned,
  IconEyeCheck,
  IconPinnedOff,
  IconArrowNarrowRight,
  IconAlertCircle,
  IconArrowNarrowDown,
} from "@tabler/icons-react";
// Utils
import { toDate } from "../../utils/Date";
import LinkTo from "../../components/LinkTo";
// Used for languages
import { Languages } from "../../config/Lang";

// Components
import { CardLoader,CardLoaderLines } from "../Animations/Loaders";

// Card header
const CardHeader = (props) => {
  const layout = props.layoutView;
  const theme = props.theme;
  const item = props.item;
  return (<Group position="apart" mb="xs">
  <Title order={3} size={layout ? "xs" : "md"} color={theme.colorScheme === "dark" ? theme.colors.teal[5] : theme.colors.dark[3]}>
    {layout ? (<Link style={{ color: theme.colorScheme === "dark" ? "#fff" : theme.colors.dark[3] }} to={`/view/${item.key}`}>{item.title && item.title.slice(0, 18)}...</Link>) : item.title && (item.title.slice(0, 18) + "...")}
  </Title>
  <Group gutter="xs">
    {item.published ? (<ActionIcon><IconEyeCheck color={theme.colors.blue[5]} size="1rem" onClick={() => props.handlePublished(item.key)} /></ActionIcon>) : ""}
    {item.pinned ? (<IconPinned size="1rem" />) : (<IconPinnedOff color="gray" size="1rem" />)}
  </Group>
</Group>)
}

//  Card body
const CardBody = props => {
  const layout = props.layoutView;
  const item = props.item;
  // Used for languages
  const [value] = useLocalStorage({ key: "language", defaultValue: "en" });
  const Lang = (name) => Languages[value][name];
  return !layout ? (<React.Fragment>
    <Text size="sm" color="dimmed">{item.description}</Text>
    <Group position="apart" mt="md" mb="xs">
      <Badge color="violet"><LinkTo query={item.category} name={item.category} /></Badge>
      <Badge color="grape">{toDate(props.value, item.lastModified)}</Badge>
    </Group>
    <Group position={layout ? "right" : "center"}>
      <Button onClick={() => props.loadSnippetView(item.key)} rightIcon={<IconArrowNarrowRight size="1rem" />} variant="light" fullWidth={layout ? false : true} color="blue" mt="md" radius="md">
        {Lang("view_more")}
      </Button>
    </Group>
    </React.Fragment>
  ) : ("")
}

/**
 * Card Views
 * @param {object} props
 */
export default function CardViews(props) {
  // Used for languages
  const [value] = useLocalStorage({ key: "language", defaultValue: "en" });
  const Lang = (name) => Languages[value][name];

  const [ready,setReady] = React.useState(false)

  // Theme colors
  const theme = useMantineTheme();
  // Layout
  const [layoutView, setLayoutView] = useLocalStorage({
    key: "layout-view",
    defaultValue: false,
  });
  // View published
  const handlePublished = React.useCallback((key) => {
    let url = `${location.origin}/api/share/${key}`;
    window.open(url, "_blank");
  }, []);

  // View bin
  const loadSnippetView = React.useCallback((key) => { navigate(`/view/${key}`);}, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    }, 800);

    return () => {
      setReady(false);
      clearTimeout(timeout);
    };
  }, []);

  if(!props.data.items) {
    return <Alert icon={<IconAlertCircle size="1rem" />} title="Ups.." color="red">
      {Lang("msg_error_fetch")} <Link to="/create">{Lang("create")}</Link>
    </Alert>
  }

  return <React.Fragment>
    <Grid gutter={layoutView ? 2 : "md"}>
      {props.data.count > 0 &&
        props.data.items.map((item) => (
          <Grid.Col md={layoutView ? 12 : 6} lg={layoutView ? 12 : 4} xl={layoutView ? 12 : 3} key={item.key}>
            {ready ? (
            <Card shadow={layoutView ? "xs" : "md"} padding="md" radius="md" mb="xs" withBorder>
              <CardHeader layoutView={layoutView} item={item} theme={theme} handlePublished={handlePublished}/>
              <CardBody layoutView={layoutView} value={value} item={item} theme={theme} loadSnippetView={loadSnippetView}/>
            </Card>
            ) : layoutView ? (<CardLoaderLines />) : (<CardLoader/>)}
          </Grid.Col>
        ))}
    </Grid>
    <Space h={10} />
    {props.data.items && props.data.count > 0 && (
      <Button
        rightIcon={<IconArrowNarrowDown size="1rem" />}
        onClick={props.loadMore}
        loading={props.loadingMore}
        variant="light"
        fullWidth
        color="teal"
        mt="md"
        radius="md">
        {Lang("load_more")}
      </Button>
    )}
  </React.Fragment>
}
