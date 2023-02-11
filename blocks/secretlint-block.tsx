import { FileBlockProps } from "@githubnext/blocks";
import { Box } from "@primer/react";
import { Editor } from "./editor/Editor";

export default function (props: FileBlockProps) {
    return <Box><Editor value={props.content}></Editor></Box>;
}
