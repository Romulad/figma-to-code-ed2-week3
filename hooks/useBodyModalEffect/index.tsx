import { useEffect } from "react";


export default function useBodyModalEffect(
    dependencies:any[], condition:boolean
){
    useEffect(()=>{
        const bodyEl = document.querySelector("body");
        if(condition){
            bodyEl?.classList.add('overflow-hidden')
        }else{
            bodyEl?.classList.remove('overflow-hidden')
        }
    }, [...dependencies])
}