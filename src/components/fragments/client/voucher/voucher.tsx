import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/useMutation";
import type { VoucherType } from "@/schemas/voucher";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Ticket } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export default function ActivateVoucherDialog(){
    const form=useForm({
        defaultValues:{
            id:''
        }
    })
        const queryClient=useQueryClient()
    const mutateVoucher=useMutate({
        url:'/api/voucher/activate-voucher',
        method:'POST',
        options:{
            onError:(err)=>toast(err.message),
            onSuccess:(data)=>{
                const validData=data.data as VoucherType
                toast(data.message);queryClient.invalidateQueries({queryKey:['activate-vouchers']});queryClient.invalidateQueries({queryKey:['lesson-card',validData.typeV]})}
        }
    })
    function activateVoucherSubmit(value:{id:string}){
        return mutateVoucher.mutate({id:value.id});
    }
    return (
        <Dialog>
            <DialogTrigger className="flex gap-2 items-center pl-2 py-2 rounded-md hover:bg-gray-200/30 w-full"><Ticket className="size-[18px]"/>Voucher</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Activate Voucher</DialogTitle>
                <DialogDescription className="text-xs text-gray-500">
                    Activate voucher here if you have voucher
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(activateVoucherSubmit)} className="flex flex-col gap-3">
                        <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input {...field} placeholder="Input voucher here..." />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}