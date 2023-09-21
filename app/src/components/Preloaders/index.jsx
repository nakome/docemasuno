import React from "react"
import {Center,Loader} from '@mantine/core';

export const Preloader = props => <Center maw="100vw" h="calc(100vh - 10rem)">
    <Loader color="teal" type="dots" size={props.size || "lg"} />
</Center>
