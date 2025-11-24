import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import type { ActivatedVoucherType } from "@/schemas/voucher";
import { LockKeyhole } from "lucide-react";
import { useEffect } from "react";
interface dummyDataProps{
    title:string,
    length:number,
    excerpt:string,
    unlocked:boolean
}
export default function SpeakingCard(){
    const {data:vouchers}=useFetch<ActivatedVoucherType[]>({
        queryKey:['activate-vouchers'],
        url:'/api/voucher/get-active-vouchers',
    })
    const voucherSpeakingIsActive = vouchers?.data?.some(
  (v) => v.typeV === "speaking"
) || false;
useEffect(()=>console.log(vouchers,voucherSpeakingIsActive),[vouchers])

    const dummyList: dummyDataProps[] = [
  {
    title: "Factual Information",
    length: 80,
    excerpt:
      "Identify information that is explicitly stated in the passage. These questions focus on details stated directly.Determine the meaning of a word or phrase as used in a specific context within the passage",
    unlocked: true,
  },
  {
    title: "Negative Factual",
    length: 60,
    excerpt:
      "Identify information NOT stated in the passage. Test takers must eliminate statements not supported by the text.Determine the meaning of a word or phrase as used in a specific context within the passage",
    unlocked: true,
  },
  {
    title: "Inference",
    length: 50,
    excerpt:
      "Requires recognizing information that is implied but not directly mentioned in the passage.Determine the meaning of a word or phrase as used in a specific context within the passage",
    unlocked: true,
  },
  {
    title: "Rhetorical Purpose",
    length: 40,
    excerpt:
      "Understand why the author includes specific information or writes something in a certain way.Determine the meaning of a word or phrase as used in a specific context within the passage",
    unlocked: true,
  },
  {
    title: "Sentence Simplification",
    length: 30,
    excerpt:
      "Identify the answer that best expresses the essential information in a complex sentence.Determine the meaning of a word or phrase as used in a specific context within the passage",
    unlocked: voucherSpeakingIsActive,
  },
  {
    title: "Vocabulary",
    length: 20,
    excerpt:
      "Determine the meaning of a word or phrase as used in a specific context within the passage.Determine the meaning of a word or phrase as used in a specific context within the passage",
    unlocked: voucherSpeakingIsActive,
  },
];
return dummyList.map((item) => (
    <Card className="w-full h-full min-h-[200px] relative overflow-hidden" key={'speaking'+item.title}>
        <CardHeader className="flex justify-between"><h2 className="text-2xl font-semibold">Speaking {item.title}</h2><p>0/{item.length}</p></CardHeader>
        <CardContent>
            <div className="text-ellipsis line-clamp-3 text-left text-sm text-slate-600">{item.excerpt}</div>
        </CardContent>
        {!item.unlocked&&<div className="size-full flex justify-center items-center bg-black/20 absolute top-0 left-0 "><LockKeyhole absoluteStrokeWidth={false} size={64} className="text-black font-bold"/></div>}
    </Card>
      ))
  
}