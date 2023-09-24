import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  AppShell,
  MantineProvider,
  ColorSchemeProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {
  useLocalStorage,
  useDisclosure,
  useViewportSize,
} from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";

import { Preloader } from "./components/Animations/Loaders";

// Components
import NavBarComponent from "./components/NavBarComponent"
import HeaderComponent from "./components/HeaderComponent"

// App
import App from "./App";

/**
 * Main App
 */
export default function MainApp() {
  const [opened, { toggle }] = useDisclosure(false);
  const { width } = useViewportSize();

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "light",
  });

  // Refresh page
  const handleRefresh = () => window.location.reload();
  // Toggle color scheme
  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));

  // AppShell background css
  const AppShellStyle = {
    backgroundImage:
      "-webkit-repeating-radial-gradient(top center,rgba(0,0,0,.1),rgba(0,0,0,.1) 1px,transparent 0,transparent 100%)",
    backgroundSize: "20px 20px",
  }

  const NavBar = (<NavBarComponent opened={opened} toggle={toggle} />);
  const Header = (<HeaderComponent refresh={handleRefresh} changeTheme={toggleColorScheme} showBurger={width < 700 ? true : false} opened={opened} toggle={toggle}/>);

  return (<React.Suspense fallback={<Preloader/>}>
    <React.StrictMode>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <AppShell padding={0} style={AppShellStyle} layout={width < 700 ? "default" : "alt"} navbar={NavBar} header={Header}>
            <ModalsProvider><App /></ModalsProvider>
          </AppShell>
          <Notifications position="top-right" zIndex={2077} />
        </MantineProvider>
      </ColorSchemeProvider>
    </React.StrictMode>
    </React.Suspense>
  );
}

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<MainApp />);
