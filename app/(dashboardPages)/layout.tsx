"use client"

import { useEffect, useState } from "react";

import { SideBar, NavBar } from "@/components";
import { sidebarStateContext, themeContext } from "@/lib/context";
import { themeMode, themeModeKey } from "@/lib/constants";
import { themeModeOptions } from "@/lib/definitions";

export default function DashboardLayout(
    { children } : { children: React.ReactNode }
){
    const [sidebarState, setSidebarState] = useState<boolean>(false);
    const [theme, setTheme] = useState<themeModeOptions>(themeMode.light);

    useEffect(()=>{
        const documtElement = document.querySelector("html");
        const currentTheme = localStorage.getItem(themeModeKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;    

        if(
            currentTheme && 
            (currentTheme === themeMode.light || currentTheme === themeMode.dark)
        ){
            /* This preference take precendence over all other preferences */
            setTheme(currentTheme);
            currentTheme === themeMode.dark && documtElement?.classList.add(currentTheme);
        }else if(prefersDark){
            setTheme(themeMode.dark);
            documtElement?.classList.add('dark');
        }else if(prefersLight){
            setTheme(themeMode.light);
            documtElement?.classList.remove('dark');
        }else{
            setTheme(themeMode.light);
            documtElement?.classList.remove('dark');
        }
    }, [])

    function updateSidebarState(){
        setSidebarState(!sidebarState)
    }

    function updateThemeMode(){
        const documtElement = document.querySelector("html");
        if(theme === themeMode.light){
            setTheme(themeMode.dark);
            localStorage.setItem(themeModeKey, themeMode.dark);
            documtElement?.classList.add('dark');
        }else{
            setTheme(themeMode.light)
            localStorage.setItem(themeModeKey, themeMode.light);
            documtElement?.classList.remove('dark');
        }
    }

    return(
        <themeContext.Provider value={{theme, setTheme: updateThemeMode}}>
            <sidebarStateContext.Provider value={{sidebarState, setSidebarState: updateSidebarState}}>
                <SideBar />
                <main className="ms-0 lg:ms-64">
                    <NavBar />
                    <div className="px-4 sm:px-6 mt-8">
                        { children }
                    </div>
                </main>
            </sidebarStateContext.Provider>
        </themeContext.Provider>
    )
}