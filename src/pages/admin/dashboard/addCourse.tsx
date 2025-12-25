import { AppSidebarAdmin } from "@/components/fragments/admin/Sidebar/sidebarAdmin";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutate } from "@/hooks/useMutation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel, SelectTrigger } from "@radix-ui/react-select";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
const addFormSchemas = z.object({
  title: z
    .string()
    .min(8, "Must be atleast 8 characters")
    .max(20, "No more than 20 characters"),
  description: z
    .string()
    .min(8, "Must be atleast 8 characters")
    .max(300, "No more than 300 characters"),
  type: z
    .enum(
      ["listening", "reading", "speaking", "writing"],
      "type does not exist"
    ),
  time: z.enum(["30m", "60m", "120m", "180m"],'Must select'),
  isFree:z.boolean().default(false)
});
export default function AddCourse() {
  const navigate = useNavigate();
  const addCourseMutate = useMutate<
    any,
    {
      title: string;
      description: string;
      type: "writing" | "speaking" | "reading" | "listening" | undefined;
      time: "30m" | "60m" | "120m" | "180m" | undefined;
      isFree:boolean|undefined
    }
  >({
    method: "POST",
    isHeaderJSON: true,
    url: "/api/test/create-test",
    options: {
      onSuccess: (data) => {
        toast(data.message);
        setTimeout(
          () =>
            navigate(
              `/admin-dashboard/edit-course/${data.data.type}/${data.data.titleSlug}`
            ),
          3000
        );
      },
      onError: (error) => {
        toast(error.message);
        console.log(error.message);
      },
    },
  });
  const form = useForm({
    defaultValues: { title: "", description: "", type: undefined, time: undefined,isFree:false },
    resolver: zodResolver(addFormSchemas),
  });
  const isMobile = useIsMobile();
  function onSubmit() {
      console.log(form.getValues().description)
    const { title, description, type, time,isFree } = form.getValues();
    return addCourseMutate.mutate({ title, description, type, time,isFree });
  }
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <div className="size-full min-h-screen flex">
        {isMobile && <SidebarTrigger />}
        <div className="size-full min-h-screen p-2 max-md:border-l max-md:border-l-gray-400 flex justify-center items-start">
          <div className="w-[95%] bg-white px-2 flex flex-col gap-4 h-full min-h-screen border border-gray-500 rounded-md">
            <div className="w-full h-14 p-2 border border-gray-400 rounded-xl">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Course</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
               <DialogTitle>Add Course Form</DialogTitle>
               <DialogDescription>Here is the form to add course <span className="text-red-400 text-xs">*All input must be filled</span></DialogDescription>
               </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                      <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Text here..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Text here..." maxLength={300}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="type"
                        control={form.control}
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Types</FormLabel>
                            <FormControl>
                              <Select value={field.value ?? ""}
                               onValueChange={field.onChange}>
                                <SelectTrigger className="border border-gray-400 p-1 rounded-sm">
                                  <SelectValue placeholder={"Select Type"} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel className="text-center text-slate-500 text-sm">Types</SelectLabel>
                                    <SelectItem value="writing">
                                      Writing
                                    </SelectItem>
                                    <SelectItem value="listening">
                                      Listening
                                    </SelectItem>
                                    <SelectItem value="reading">
                                      Reading
                                    </SelectItem>
                                    <SelectItem value="speaking">
                                      Speaking
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="time"
                        control={form.control}
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Time Duration</FormLabel>
                            <FormControl>
                              <Select value={field.value ?? ""}
          onValueChange={field.onChange}>
                                <SelectTrigger className="border border-gray-400 p-1 rounded-sm">
                                  <SelectValue placeholder={"Select time"} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel className="text-center text-slate-500 text-sm">Times</SelectLabel>
                                    <SelectItem value="30m">
                                      30 Minutes
                                    </SelectItem>
                                    <SelectItem value="60m">
                                      60 Minutes
                                    </SelectItem>
                                    <SelectItem value="120m">
                                      120 Minutes
                                    </SelectItem>
                                    <SelectItem value="180m">
                                      180 Minutes
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="isFree"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex gap-2 items-center">
                            <FormLabel htmlFor="isFree" className="font-semibold">Is this course free?</FormLabel>
                            <FormControl>
                              <Switch id='isFree' checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Add Course</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
