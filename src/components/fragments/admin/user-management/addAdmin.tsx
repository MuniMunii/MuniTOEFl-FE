import { authClient } from "@/api/authClient"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader,Dialog, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {z}from 'zod'
const RegisterScheme = z
  .object({
    Username: z
      .string()
      .min(4, "At least 4 characters")
      .max(16, "Maximum 16 characters"),
    Email: z.email(),
    Password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*\d).{6,}$/,
        "Password must contain at least one uppercase letter and one number"
      ),
      noTelp:z.string().trim()
    .regex(/^\+?\d{6,17}$/, {
      message:
        "Phone number must be 6–17 digits",
    }),
    ConfirmPassword: z.string(),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    path: ["ConfirmPassword"],
    error: "Password tidak match",
  });
type RegisterType = z.infer<typeof RegisterScheme>;
export default function AddAdmin(){
      const form = useForm<RegisterType>({
        resolver:zodResolver(RegisterScheme),
        defaultValues: { 
            Email:'',
            Username:'',
        Password:'',
    ConfirmPassword:'',
    noTelp:''
 },
      });
          const clientQuery=useQueryClient()
    async function onSubmitAddAdmin(value:RegisterType){
    console.log(value)
    const {data,error}=await authClient.admin.createUser({
      name:value.Username,
      email:value.Email,
      password:value.Password,
      role:'user',
      data:{noTelp:value.noTelp}
    })
    if(error){toast('Error adding admin');return}
    if(data){toast('Successfully adding admin');clientQuery.invalidateQueries({queryKey:['users']});return}
  }
    return (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Add Admin</Button>
    </DialogTrigger>
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitAddAdmin)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Admin</DialogTitle>
            <DialogDescription>Test</DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="Username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="MuniMuni" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="089999999" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="*********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ConfirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="*********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);

}