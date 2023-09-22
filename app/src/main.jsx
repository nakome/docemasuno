import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { AppShell, MantineProvider,ColorSchemeProvider} from '@mantine/core';
import { Notifications } from "@mantine/notifications";
import { useLocalStorage, useDisclosure,useViewportSize } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';

// Components
import NavBarComponent from "./components/NavBarComponent";
import HeaderComponent from "./components/HeaderComponent";

// App
import App from "./App"

/**
 * Main App
 */
export default function MainApp() {

  const [opened, { toggle }] = useDisclosure(false);
  const { width } = useViewportSize();

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'color-scheme',
    defaultValue: 'light',
  });

  // Refresh page
  const handleRefresh = () => window.location.reload()
  // Toggle color scheme
  const toggleColorScheme = () => setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <React.StrictMode>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell
          padding="md"
          style={{backgroundImage: "-webkit-repeating-radial-gradient(top center,rgba(0,0,0,.1),rgba(0,0,0,.1) 1px,transparent 0,transparent 100%)", backgroundSize: "20px 20px"}}
          layout={width < 700 ? "default" : "alt"}
          navbar={<NavBarComponent opened={opened} toggle={toggle}/>}
          header={<HeaderComponent refresh={handleRefresh} changeTheme={toggleColorScheme} showBurger={width < 700 ? true : false} opened={opened} toggle={toggle}/>}
        >
          <ModalsProvider>
            <App/>
          </ModalsProvider>
        </AppShell>
        <Notifications position="top-right" zIndex={2077}/>
      </MantineProvider>
      </ColorSchemeProvider>
    </React.StrictMode>
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<MainApp />);
