import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue,SelectContent, SelectLabel, SelectGroup } from "@/components/ui/select";
import { useMutate } from "@/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
type durationProps='1'|'3'|'5'
type typeProps='listening'|'writing'|'reading'|'speaking'
interface addVoucherProps{
    duration:durationProps|null,
    type:typeProps|null
    orderLength:number
}
export default function AddVoucher(){
    const [value,setValue]=useState<addVoucherProps>({
        duration:null,
        type:null,
        orderLength:0,
    })
    const queryClient=useQueryClient()
    const mutateVoucher = useMutate<addVoucherProps, { duration: durationProps|null,typeV:typeProps|null,orderLength:number }>({
  url: "/api/voucher/vouchers",
    method: "POST",
    options:{
        onError:()=>toast('Error adding voucher'),
        onSuccess:()=>{toast('Successfully adding voucher');queryClient.invalidateQueries({queryKey:["voucher"]})}
    }
  });
function generateVoucher(){
    if(!value.duration){return toast("Duration cannot be empty")}
    if(!value.type){return toast("Type cannot be empty")}
    if(!value.orderLength || value.orderLength <= 0){return toast("Order Voucher cannot be empty")}
    return mutateVoucher.mutate({duration:value.duration,orderLength:value.orderLength,typeV:value.type})
}
    return <div className="size-full min-h-[100px] shadow-md border-gray-500/60 p-4 rounded-md flex justify-center items-center gap-4">
        <Button onClick={generateVoucher}>Generate</Button>
        <Select onValueChange={(val)=>setValue(prev=>({...prev,duration:val as durationProps}))}>
            <SelectTrigger>
                <SelectValue placeholder="Select a duration"/>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </SelectTrigger>
        </Select>
        <Select onValueChange={(val)=>setValue(prev=>({...prev,type:val as typeProps}))}>
            <SelectTrigger>
                <SelectValue placeholder="Select a Type"/>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="listening">Listening</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="speaking">Speaking</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </SelectTrigger>
        </Select>
        <Input type="number" placeholder="Number ticket want to generate" max={10} min={0} onChange={(val)=>setValue(prev=>({...prev,orderLength:parseInt(val.target.value)}))}/>
    </div>
}