"use client"

import { SideBar, NavBar } from "@/components";
import { sidebarStateContext } from "@/lib/context";
import { useState } from "react";

export default function DashboardLayout(
    { children } : { children: React.ReactNode }
){
    const [sidebarState, setSidebarState] = useState<boolean>(false);

    function updateSidebarState(){
        setSidebarState(!sidebarState)
    }

    return(
        <sidebarStateContext.Provider value={{sidebarState, setSidebarState: updateSidebarState}}>
            <SideBar />
            <main className="ms-0 lg:ms-64">
                <NavBar />
                { children }
            </main>
        </sidebarStateContext.Provider>
    )
}