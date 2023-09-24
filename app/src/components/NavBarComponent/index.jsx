import React from "react";
import { Link,useLocation  } from "wouter";
import { useViewportSize } from "@mantine/hooks";
import {
  createStyles,
  ScrollArea,
  Navbar,
  Group,
  Code,
  Box,
  Title,
  Anchor,
  useMantineTheme
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconHome2,
  IconUser,
  IconSettings,
  IconCirclePlus,
  IconPinned,
  IconWorldShare
} from "@tabler/icons-react";
// Used for languages
import {Languages} from "../../config/Lang";
// App settings
import AppSettings from "../../config/AppSettings";
// Styles
import { NavBarStyle } from "./styles";
// Used styles
const useStyles = createStyles(NavBarStyle);
/**
 * NavBarComponent
 * @param {object} props
 */
export default function NavBarComponent(props) {
  // Used for languages
  const [value] = useLocalStorage({ key: 'language', defaultValue: 'en' });
  const Lang = name => Languages[value][name];
  // location
  const [location] = useLocation();
  // Theme colors
  const theme = useMantineTheme();
  // Styles
  const { classes } = useStyles();
  // Viewport size
  const { width } = useViewportSize();
  // Links
  const Links = [
    { color: theme.colorScheme === "dark" ? theme.colors.teal[5] : theme.colors.teal[7], link: "/", label: Lang("home"), icon: IconHome2 },
    { color: theme.colorScheme === "dark" ? theme.colors.red[5] : theme.colors.red[7], link: "/pinned", label: Lang("pinned"), icon: IconPinned },
    { color: theme.colorScheme === "dark" ? theme.colors.pink[5] : theme.colors.pink[7], link: "/shared", label: Lang("shared_links"), icon: IconWorldShare },
    { color: theme.colorScheme === "dark" ? theme.colors.indigo[5] : theme.colors.indigo[7], link: "/create", label: Lang("add_new"), icon: IconCirclePlus },
    { color: theme.colorScheme === "dark" ? theme.colors.blue[5] : theme.colors.blue[7], link: "/about-us", label: Lang("about_us"), icon: IconUser },
    { color: theme.colorScheme === "dark" ? theme.colors.orange[5] : theme.colors.orange[7], link: "/settings", label: Lang("settings"), icon: IconSettings },
  ];

  return (
    <Navbar
      p="lg"
      width={{ base: width < 700 ? 0 : 230 }}
      className={classes.navbar}
      style={{
        height:"100%",
        display: props.opened ? "inherit" : width < 700 ? "none" : "inherit",
      }}
    >
      <Navbar.Section mt="xs">
        <Box sx={classes.header}>
          <Title order={1} align="center" mb={20}>
            <span className={classes.firstLogoLetter}>D</span>0C3+1
          </Title>
        </Box>
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {Links.map((item) => (
          <Link
            className={location === item.link ? `${classes.link} ${classes.active}` : classes.link}
            to={item.link}
            key={item.label}
            onClick={props.toggle}
          >
            <item.icon className={classes.linkIcon} color={item.color} stroke={1.5} />
            <span>{item.label}</span>
          </Link>
        ))}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Group position="apart">
          <Anchor target="_blank" color="teal" href={AppSettings.website}>
            @me
          </Anchor>
          <Code sx={{ fontWeight: 700 }}>{AppSettings.version}</Code>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}
