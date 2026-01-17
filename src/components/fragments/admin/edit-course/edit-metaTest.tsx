import { apiClient } from "@/api/axiosClient";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { metaTestDataType } from "@/schemas/meta-test";
import { useMutation } from "@tanstack/react-query";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";

export default function EditMetaTest({
  metaData,
  metaLoading,
  metaError
}: {
  metaData: metaTestDataType | undefined;
  metaLoading:boolean;
  metaError:Error|null
}) {
  const updateMeta = useMutation({
    mutationFn:async ({ prop, value }: { prop: string; value: any }) =>{
      const res=await apiClient.patch(`/api/test/update-meta/${prop}/${metaData!._id}`, {
        value,
      })
      const message=await res.data.message
      toast(message)
    },
  });
  if(metaLoading){
    return (
      <div className="w-full flex flex-col gap-4">
        <Skeleton className="w-full h-20 bg-gray-400/40"/>
        <Skeleton className="w-full h-36 bg-gray-400/40"/>
      </div>
    )
  }
  if(metaError){
    return (
      <Alert variant={'destructive'}>
        <AlertCircleIcon/>
        <AlertTitle>Error, cannot display description try again later</AlertTitle>
        <AlertDescription>
          <ul>
            <li>{metaError?.message}</li>
          </ul>
        </AlertDescription>
      </Alert>
    )
  }
  return (
    <div className="w-full flex flex-col gap-4 ">
      <Input
        className="text-4xl! py-3! h-fit font-semibold"

        defaultValue={metaData?.title ?? ""}
        onBlur={(e) =>
          updateMeta.mutate({ prop: "title", value: e.target.value })
        }
      />
      <Textarea
        defaultValue={metaData?.description ?? ""}
        maxLength={300}
        className="max-h-[150px]"
        onBlur={(e) =>
          updateMeta.mutate({ prop: "description", value: e.target.value })
        }
      />
      <p>Status: {metaData?.published ? "Published" : "Archived"}</p>
      <div className="flex items-center gap-3">
        <p>Duration</p>
      <Select
        defaultValue={metaData?.time ?? ""}
        onValueChange={(value) => updateMeta.mutate({ prop: "time", value })}
      >
        <SelectTrigger className="border border-gray-400 p-1 rounded-sm">
          <SelectValue placeholder={"Select time"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-center text-slate-500 text-sm">
              Times
            </SelectLabel>
            <SelectItem value="30m">30 Minutes</SelectItem>
            <SelectItem value="60m">60 Minutes</SelectItem>
            <SelectItem value="120m">120 Minutes</SelectItem>
            <SelectItem value="180m">180 Minutes</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
      <div className="flex items-center w-fit">
        <Label htmlFor="isFree">Is Free</Label>
        <Switch
          id="isFree"
          defaultChecked={metaData?.isFree}
          onCheckedChange={(checked) =>
            updateMeta.mutate({ prop: "isFree", value: checked })
          }
        ></Switch>
      </div>
    </div>
  );
}
