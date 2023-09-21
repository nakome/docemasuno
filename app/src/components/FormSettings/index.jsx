import React from "react";
import { useLocalStorage } from '@mantine/hooks';
import { Grid, TextInput, Textarea, NativeSelect} from "@mantine/core";
import { IconCategory } from "@tabler/icons-react";
// Categories
import Categories from "../../config/Categories";
// Used for languages
import { Languages } from "../../config/Lang";

export default function FormSettings(props) {
    // Used for languages
    const [value] = useLocalStorage({ key: 'language', defaultValue: 'en' });
    const Lang = name => Languages[value][name];
    return (<Grid grow>
        <Grid.Col sm={12} md={6}>
          <TextInput
            placeholder={Lang("default_title")}
            label={Lang("title")}
            value={props.data.title}
            withAsterisk
            onChange={(evt) => props.updateState("title", evt.currentTarget.value)}
            error={!props.data.title && Lang("error_field")}
            mb={10}
          />
          <NativeSelect
            label={Lang("select_category")}
            value={props.data.category}
            onChange={(evt) => props.updateState("category", evt.currentTarget.value)}
            data={Categories}
            icon={<IconCategory size="1rem" />}
          />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <Textarea
            placeholder={Lang("default_description")}
            label={Lang("description")}
            minRows={3}
            withAsterisk
            value={props.data.description}
            onChange={(evt) => props.updateState("description", evt.currentTarget.value)}
            error={!props.data.description && Lang("error_field")}
          />
        </Grid.Col>
      </Grid>)
}