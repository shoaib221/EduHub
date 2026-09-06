"use client"

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

export default function LessonViewer({
    content,
}: {
    content: any;
}) {
    const editor = useCreateBlockNote({
        initialContent: content,
    });

    return (
        <BlockNoteView
            editor={editor}
            editable={false}
        />
    );
}