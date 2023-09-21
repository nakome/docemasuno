import { navigate } from "wouter/use-location";
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  rem
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconArrowLeft } from "@tabler/icons-react";

// Used for languages
import {Languages} from "../config/Lang"

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

/**
 * Not Found
 */
export default function NotFound() {
  // Used for languages
  const [value] = useLocalStorage({ key: 'language', defaultValue: 'en' });
  const Lang = name => Languages[value][name];
  // Back to hom
  const backToHome = () => navigate("/");
  // Styles
  const { classes } = useStyles();
  return (
    <Container className={classes.root}>
      <Group>
          <Title color="teal.5" mb={10} className={classes.title}>{Lang("not_found")}</Title>
          <Text color="dimmed" size="lg"  mb={10}>{Lang("page_not_found")}</Text>
          <Button
            onClick={backToHome}
            variant="light"
            color="red.9"
            size="md"
            leftIcon={<IconArrowLeft size="1rem" />}
            className={classes.control}
          >
            {Lang("back_to_home")}
          </Button>
      </Group>
    </Container>
  );
}
