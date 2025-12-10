import { authClient } from "@/api/authClient";
import { apiClient } from "@/api/axiosClient";
import { AppSidebar } from "@/components/fragments/client/dashboard/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PersonStanding } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const UpdateFormProps = z.object({
  name: z.string(),
  noTelp: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^\+?\d{6,17}$/.test(val), {
      message: "Phone number must be 6–17 digits",
    }),
  email: z.string().optional(),
});
export default function SettingPage() {
  const { data: session } = authClient.useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    resolver: zodResolver(UpdateFormProps),
    defaultValues: {
      name: session?.user.name,
      noTelp: session?.user.noTelp,
      email: session?.user.email,
    },
  });
  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name,
        noTelp: session.user.noTelp ?? "",
        email: session.user.email,
      });
    }
  }, [session, form]);
  async function handleUpdate() {
    return await authClient.updateUser({
      name: form.getValues().name,
      noTelp: form.getValues().noTelp,
    });
  }
  async function removeImage() {
    return await authClient.updateUser({
      image: "",
    });
  }
  const changeImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("image", file); // MUST MATCH your backend field name

      return await apiClient.post("/api/user/change-image", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });

  async function handleChangeImage(file: File) {
    const res = await changeImageMutation.mutateAsync(file);
    if (res?.data?.data?.url) {
      await authClient.updateUser({
        image: res.data.data.url,
      });
    }
  }
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="size-full min-h-screen flex">
        {isMobile && <SidebarTrigger />}
        <div className="size-full min-h-screen p-2 max-md:border-l max-md:border-l-gray-400 flex justify-center items-start">
          <div className="size-full min-h-screen border border-gray-500/40 rounded-xl shadow-2xl flex gap-2 justify-between p-10">
            <div className="h-full p-4 lg:w-2/6 border border-slate-500/40 rounded-md">
              <div className="rounded-full overflow-auto size-24 mx-auto border border-gray-500/40">
                {session?.user.image ? (
                  <img
                    src={session.user.image}
                    className="size-full object-cover object-center"
                  />
                ) : (
                  <div className="flex size-full justify-center items-center ">
                    <PersonStanding />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <Button onClick={() => inputRef.current?.click()}>
                  Change Image
                </Button>

                <input
                  type="file"
                  ref={inputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleChangeImage(file);
                  }}
                />
                <Button onClick={() => removeImage()}>Remove Image</Button>
              </div>
            </div>
            <div className="size-full px-4 py-0 flex-col flex gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="example@gmail.com"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="example@gmail.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="noTelp"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="08xxxxxxxxxx" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={
                      !form.formState.isDirty || form.formState.isSubmitting
                    }
                  >
                    {form.formState.isSubmitting
                      ? "Updating..."
                      : "Submit Update"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
