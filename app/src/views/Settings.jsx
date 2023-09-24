import React from "react";
import {Container,Title,FileInput,Button,rem,Box,Select,Grid,Textarea,Space } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from "@mantine/notifications";
import {IconDatabaseExport,IconDatabaseImport,IconUpload}  from "@tabler/icons-react";

// Used for languages
import {Languages} from "../config/Lang";

// Export functions
import ExportJson from "../utils/ExportJSon";
// Import functions
import HandleImportRawUrl from "../utils/ImportJson";
/**
 * Settigns
 * @param {object} params
 */
export default function Settings({ params }) {
  // Used for languages
  const [value,setValue] = useLocalStorage({ key: 'language', defaultValue: 'en' });
  const Lang = name => Languages[value][name];
  // Forms file
  const [file,setFile] = React.useState(null);
  // Loader btns
  const [loadingIm,setImLoading] =  React.useState(false);
  const [loadingEx,setExLoading] =  React.useState(false);
  // Messages
  const Messages = {
    array_error:{
      title: Lang("error"),
      message: Lang("error_import"),
      color: "red",
      autoClose: 2000,
      withCloseButton: false,
    },
    success_import:{
        title: Lang("success"),
        message: Lang("success_import"),
        autoClose: 2000,
        color: "green",
        withCloseButton: false,
    },
    error_import_fetch:{
      title: Lang("error"),
      message: Lang("error_import_fetch"),
      autoClose: 2000,
      color: "red",
      withCloseButton: false,
    }
  }
  // Export
  const handleExport = async () => {
    setExLoading(true)
    const response = await ExportJson()
    if(response) setExLoading(false);
  }
  // Import
  const handleImport = async () => {
    setImLoading(true)
      const response = await HandleImportRawUrl(file)
      switch (response[0].msg) {
        case "array_error":
          setImLoading(false)
          notifications.show(Messages.array_error);
          break;
        case "success_import":
          setImLoading(false)
          notifications.show(Messages.success_import);
          break;
        case "error_import_fetch":
          setImLoading(false)
          notifications.show(Messages.error_import_fetch);
          break;
      }
  };

  return (
      <Container fluid>
        <Grid>
          <Grid.Col xs={12} md={6} xl={4}>
            <Title order={1} my="lg" color="teal.5">{Lang("import_json")}</Title>
            <FileInput
              placeholder={Lang("pick_file")}
              label={Lang("pick_label")}
              my="lg"
              accept=".json"
              icon={<IconUpload size={rem(14)} />}
              value={file}
              onChange={setFile}
            />

            <Button mb="xl" loading={loadingIm}  onClick={handleImport} leftIcon={<IconDatabaseExport size={rem(14)}/>} variant="light" mr="md">{Lang("import")}</Button>
            <Button mb="xl" loading={loadingEx} onClick={handleExport} leftIcon={<IconDatabaseImport size={rem(14)}/>} variant="light" color="indigo.5">{Lang("export")}</Button>

            <Select
              label={Lang("language")}
              placeholder={`Pick one, current ${value}`}
              value={value}
              onChange={setValue}
              data={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'gl', label: 'Galician' },
                { value: 'de', label: 'German' },
              ]}
            />

          </Grid.Col>
        </Grid>
      </Container>
    )
}