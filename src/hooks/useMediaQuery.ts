import { useState,useEffect } from "react";
/**
@Example of use
  const isPhone=useMediaQuery('(min-width:320px)')
  const isTablet=useMediaQuery('(min-width:764px)')
  const isLaptop=useMediaQuery('(min-width:1024px)')
 */
export default function useMediaQuery(query: string) {
    const [matches,setMatches]=useState<boolean>(false)
    useEffect(()=>{
        if (typeof window === "undefined") return;
        const mediaQueryList=window.matchMedia(query)
        if(mediaQueryList.matches!==matches){
            setMatches(mediaQueryList.matches)
        }
        const listener=()=>setMatches(mediaQueryList.matches)
        mediaQueryList.addEventListener('change',listener)
        return ()=>mediaQueryList.removeEventListener('change',listener)
    },[query])
    return matches
}