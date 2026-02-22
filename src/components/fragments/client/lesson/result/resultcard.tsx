import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { ResultProps } from "@/pages/client/dashboard/result/result"
import { generateHTML, type JSONContent } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import { useMemo, useState } from "react"
import DOMPurify from "dompurify";
import { X, Check } from "lucide-react"
import { Card } from "@/components/ui/card"
function isJSONContent(value: unknown): value is JSONContent {
  return typeof value === "object" && value !== null && "type" in value;
}
export default function ResultCard({result,order}:{result:ResultProps,order:number}){
    const [isOpen,setOpen]=useState<boolean>(false)
      const description = useMemo(() => {
        const desc = result.qDescription;
        if (!isJSONContent(desc)) return "";
        const DescriptiontoHtml = generateHTML(desc, [StarterKit]);
        return DOMPurify.sanitize(DescriptiontoHtml, {
          ALLOWED_TAGS: [
            // text structure
            "p",
            "br",
            // emphasis
            "strong",
            "em",
            "u",
            "s",
            "mark",
            "code",
            // links
            "a",
            // lists
            "ul",
            "ol",
            "li",
            // blocks
            "blockquote",
            "pre",
            // headings
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
          ],
          ALLOWED_ATTR: ["href", "target", "rel", "data-list"],
        });
      }, [result.qDescription]);
    return (
        <Card className="flex flex-col gap-3 w-full border border-gray-400 p-4 rounded-md lg:max-w-[680px]">
          <div className="flex gap-2 items-center">
            <p>{order+1}</p>
            <h2 className="text-2xl font-semibold">{result.qTitle}</h2>
            </div>
            <Collapsible open={isOpen} onOpenChange={setOpen} className="flex flex-col gap-3">
            <CollapsibleTrigger asChild><Button className="w-fit" variant={'outline'}>{isOpen?"Close Question":"Open Question"}</Button></CollapsibleTrigger>
            <CollapsibleContent>
            <div dangerouslySetInnerHTML={{__html:description}} className="max-w-none w-full border border-gray-500"/>
            </CollapsibleContent>
            </Collapsible>
            <p><span>{result.userChoice} {result.isCorrect?<Check/>:<X/>}</span></p>
        </Card>
    )
}