import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className='bg-[#0B1FD1] w-full min-h-screen flex flex-col justify-center items-center p-6'>
      <div className='flex flex-col lg:flex-row gap-10 justify-center items-center w-full max-w-7xl'>
        <div className='flex flex-col gap-4 justify-center items-center text-center lg-text-left lg:items-start'>
          <h2 className='font-extrabold text-white text-3xl lg:text-4xl self-center'>Studyfirst</h2>
         <span className='font-bold text-white text-lg lg:text-2xl max-w-md self-center'>Langganan untuk akses beragam konten dan fitur belajar menarik</span>
         <div className='mt-10'>
           <img src="/primary-form-illustration.png" alt="" className='w-[300px] sm:w-[400px] lg:w-[600px] h-auto'/>
         </div>
        </div>
         

         <div className='w-full sm:w-[400px]'>
          <Card className='w-full shadow-xl'>
            <CardHeader>
              <CardTitle className='text-center text-2xl'>Yuk, daftar atau masuk untuk melanjutkan!</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <Label>Username</Label>
              <Input placeholder='JhonDoe'/>
              <Label>E-Mail</Label>
              <Input placeholder='example@gmail.com'/>
              <Label>Password</Label>
              <Input placeholder='******'/>
              <Label>Confirm Password</Label>
              <Input placeholder='******'/>
              <Button className='bg-[#0B9FD1] text-white font-bold rounded-full mt-2'>Lanjutkan</Button>
                <CardDescription className='flex items-center my-2'>
                  <div className="grow border-t border-gray-300"></div>
                    <span className="mx-2 text-gray-500 text-sm">atau</span>
                  <div className="grow border-t border-gray-300"></div>
                </CardDescription>
               <Button variant={"outline"} className='flex flex-row gap-2 items-center justify-center'>
                <img src="/google.jpg" alt="" className='w-6 h-auto'/>
                <h4>Google</h4>
              </Button>
            </CardContent>
             < CardFooter className="justify-center">
              <div className="flex flex-row gap-2 text-sm">
                <h3>Anda sudah punya akun ?</h3>
                <Link to={"/auth/login"} className="text-[#0B9FD1] italic font-bold hover:underline">Login</Link>
              </div>
            </CardFooter>
          </Card>
         </div>
      </div>
    </div>
  )
}

export default Register