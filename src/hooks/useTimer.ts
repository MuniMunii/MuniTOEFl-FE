import { useEffect, useState } from "react";

function useNow(interval = 1000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}
export function useTimer(expiresAt:string|undefined){
if (!expiresAt) {
    return {
      seconds: 0,
      minutes: 0,
      isExpired: true,
    };
  }
  const now=useNow();
  const remaining=new Date(expiresAt).getTime()-now
  const isExpired=remaining<=0
  const seconds=Math.max(0,Math.floor(remaining/1000))
  const secondFormat=Math.floor(seconds%60)
  const minuteFormat=Math.floor(seconds/60)
  return {seconds:secondFormat,minutes:minuteFormat,isExpired}
}