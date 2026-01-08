import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import type { Content } from "@tiptap/core"

export default function TextEditorTest({cursorId,initialDescription}:{initialDescription:Content,cursorId:string}) {
  return (
    <SimpleEditor content={initialDescription} cursorId={cursorId}/>
  )
}
