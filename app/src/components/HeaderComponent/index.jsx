import React from "react";
import {
  Burger,
  Header,
  Switch,
  useMantineTheme,
  Input,
  Group,
  ActionIcon
} from "@mantine/core";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { IconSun, IconMoonStars, IconSearch, IconReload, IconLayout2, IconLayoutList } from "@tabler/icons-react";
import { navigate } from "wouter/use-location";
// Used for languages
import { Languages } from "../../config/Lang";

export default function HeaderComponent(props) {
  // Used for languages
  const [value] = useLocalStorage({ key: 'language', defaultValue: 'en' });
  const Lang = name => Languages[value][name];
  // For viewport
  const { width } = useViewportSize();
  // Label menu
  const label = props.opened ? "Close navigation" : "Open navigation";
  //  Theme colors
  const theme = useMantineTheme();
  // Title state
  const [title, setTitle] = React.useState("");
  // Layout view
  const [layoutView, setLayoutView] = useLocalStorage({
    key: 'layout-view',
    defaultValue: false,
  });
  // Toggle layout
  const handleChangeLayout = () => setLayoutView(!layoutView);
  // Input search
  const handleInput = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      event.preventDefault();
      navigate(`/find/${event.target.value}`, { replace: true });
    }
  };

  return (
    <Header height={40} mb={120} style={{ minHeight: "40px", background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] }}>
      <Group position="apart" mx="md">
        <Group>
          {props.showBurger ? (
            <Burger
              mt={4}
              size={18}
              variant="light"
              color={theme.colors.gray[5]}
              opened={props.opened}
              onClick={props.toggle}
              aria-label={label}
            />
          ) : (
            ""
          )}
          <Input
            icon={<IconSearch size="1rem" />}
            placeholder={Lang("search_by_title")}
            size="xs"
            style={{ width: width < 500 ? "8rem" : "15rem" }}
            mt={4}
            onKeyDown={handleInput}
            value={title}
            onChange={(evt) => setTitle(evt.currentTarget.value)}
          />
        </Group>
        <Group>
          <ActionIcon onClick={props.refresh} variant="light" color="gray" mt={4} aria-label="Refresh">
            <IconReload size="1rem" />
          </ActionIcon>
          <ActionIcon onClick={handleChangeLayout} variant="light" color="gray" mt={4} aria-label="Layout mode">
            {layoutView ? <IconLayoutList size="1rem" /> : <IconLayout2 size="1rem" />}
          </ActionIcon>

          <Switch
            size="md"
            mt={4}
            onChange={props.changeTheme}
            color={theme.colorScheme === "dark" ? "gray" : "dark"}
            onLabel={
              <IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />
            }
            offLabel={
              <IconMoonStars
                size="1rem"
                stroke={2.5}
                color={theme.colors.blue[6]}
              />
            }
          />
        </Group>
      </Group>
    </Header>
  );
}
