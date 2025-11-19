import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/api/authClient";
import { GoogleSigninButton } from "@/components/fragments/signoutAndSigninButton";
const LoginScheme = z.object({
  Email: z.email(),
  Password: z.string(),
});
type LoginType = z.infer<typeof LoginScheme>;
// main component
const Login = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginScheme),
    defaultValues: { Email: "", Password: "" },
  });
  async function onsubmit(value: LoginType) {
      const { error } = await authClient.signIn.email({
        email: value.Email,
        password: value.Password,
        callbackURL: "http://localhost:5173/role-redirect",
        rememberMe: true,
      });
      if(error){console.log(error)}
      // if(data){navigate('/dashboard')}
  }

  return (
    <div className="bg-[#0B1FD1] w-full min-h-screen flex items-center justify-center overflow-x-hidden p-6">
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center w-full max-w-7xl">
        <div className="flex flex-col gap-4 justify-center items-center text-center lg-text-left lg:items-start">
          <h2 className="font-extrabold text-white text-3xl lg:text-4xl self-center">
            Studyfirst
          </h2>
          <span className="font-bold text-white text-lg lg:text-2xl max-w-md self-center">
            Langganan untuk akses beragam konten dan fitur belajar menarik
          </span>
          <div className="mt-10">
            <img
              src="/primary-form-illustration.png"
              alt=""
              className="w-[300px] sm:w-[400px] lg:w-[600px] h-auto"
            />
          </div>
        </div>

        <div className="w-full sm:w-[400px]">
          <Card className="w-full shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-xl lg:text-2xl">
                Yuk, daftar atau masuk untuk melanjutkan!
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onsubmit)}
                  className="flex flex-col gap-4"
                >
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
                    name="Password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput {...field} placeholder="********" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-[#0B9FD1] text-white font-bold rounded-full"
                  >
                    Lanjutkan
                  </Button>
                </form>
              </Form>
              <CardDescription className="flex items-center my-2">
                <div className="grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 text-sm">atau</span>
                <div className="grow border-t border-gray-300"></div>
              </CardDescription>
              <GoogleSigninButton/>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="flex flex-row gap-2 text-sm">
                <h3>Anda Belum Punya Akun?</h3>
                <Link
                  to={"/auth/register"}
                  className="text-[#0B9FD1] italic font-bold hover:underline"
                >
                  Register
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
