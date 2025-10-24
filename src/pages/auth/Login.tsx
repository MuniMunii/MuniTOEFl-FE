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

const Login = () => {
  return (
    <div className='bg-[#0B1FD1] w-full h-screen'>

      <div className='flex flex-row gap-4 p-4 justify-evenly items-center'>
        <div className='flex flex-col gap-4 justify-between items-center'>
          <h2 className='font-extrabold text-white text-4xl'>Studyfirst</h2>
         <span className='font-bold text-white text-2xl w-96'>Langganan untuk akses beragam konten dan fitur belajar menarik</span>
         <div className='mt-20'>
           <img src="/primary-form-illustration.png" alt="" className='w-[780px] h-auto'/>
         </div>
        </div>
         

         <div className=''>
          <Card className='w-[450px] h-auto'>
            <CardHeader>
              <CardTitle className='text-center text-2xl'>Yuk, daftar atau masuk untuk melanjutkan!</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <Label>E-Mail</Label>
              <Input placeholder='example@gmail.com'/>
              <Label>Password</Label>
              <Input placeholder='******'/>
              <Button className='bg-[#0B9FD1] text-white font-bold rounded-full'>Lanjutkan</Button>
                <CardDescription className='flex flex-row gap-2 items-center'>
                  <div> ______________________________ </div>
                   <span className='flex items-center mt-3'>atau</span>
                  <div> ______________________________ </div>
                </CardDescription>
               <Button variant={"outline"} className='flex flex-row gap-2 items-center'>
                <img src="/google.jpg" alt="" className='w-8 h-auto'/>
                <h4>Google</h4>
              </Button>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row gap-2">
                <h3>Anda Belum Punya Akun ?</h3>
                <Link to={"/auth/register"} className="text-[#0B9FD1] italic font-bold hover:underline">Register</Link>
              </div>
            </CardFooter>
          </Card>
         </div>
      </div>
    </div>
  )
}

export default Login