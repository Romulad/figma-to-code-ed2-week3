"use client"

import { useContext, useState } from "react";

import { 
    AddWalletIcon, 
    ChevronUpDownIcon, 
    HamburguerIcon, 
    MoonIcon,
    SunIcon
} from "@/assets/iconComponents";
import { sidebarStateContext, themeContext } from "@/lib/context";
import { themeMode } from "@/lib/constants";

export default function NavBar(){
    const { theme, setTheme } = useContext(themeContext);
    const [currencyIsOpen, setCurrencyIsOpen] = useState(false);
    const { setSidebarState } = useContext(sidebarStateContext);

    return(
        <nav className="sticky bg-white dark:bg-dark z-20 top-0 flex justify-between items-center border-b dark:border-gray-700 py-3 px-4 sm:px-6  
        max-[460px]:text-sm">
            <div className="flex items-center gap-14">
                <div className="flex lg:block items-center gap-2 min-[460px]:gap-6">
                    <button className="lg:hidden border border-gray-500 p-2 rounded-xl"
                    onClick={setSidebarState}>
                        <HamburguerIcon />
                    </button>

                    <div className="flex-col gap-1 hidden min-[320px]:flex">
                        <h1 className="font-medium">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-slate-300">
                            Welcome back, John Doe !
                        </p> 
                    </div>
                </div>

                <button className="bg-blue-500 dark:bg-blue-600 text-white hidden min-[680px]:flex items-center gap-2 px-5 py-2 rounded-xl
                hover:bg-blue-600">
                    <AddWalletIcon />
                    <span>Connect wallet</span>
                </button>
            </div> 

            <div className="flex gap-3 text-gray-500 dark:text-white">
                <div className="relative">
                    <button className="flex items-center gap-3 rounded-xl border text-sm
                    focus:border-2 dark:border-gray-700 py-2 px-4" 
                    onClick={()=>{setCurrencyIsOpen(!currencyIsOpen)}}>
                        <span>
                            USD
                        </span>
                        <div className="flex-col hidden min-[460px]:flex">
                            <ChevronUpDownIcon className="size-5"/>
                        </div>
                    </button>

                    <ul className={`${currencyIsOpen ? "block" : "hidden"}
                    bg-white dark:bg-slate-800 dark:divide-gray-700 absolute left-0 py-1 mt-1 w-full shadow-lg rounded-xl 
                    text-gray-900 divide-y text-sm dark:text-slate-100`}>
                        {["CAD", "EUR", "XCD"]
                        .map((currenc, index)=>(
                            <li key={index}>
                                <button className="px-3 py-2 text-center w-full hover:bg-blue-100 dark:hover:bg-slate-600 duration-500">
                                    {currenc}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="flex items-center px-2 border focus:border-2 dark:border-gray-700 rounded-xl "
                onClick={setTheme}>
                    {theme === themeMode.light ?
                    <MoonIcon className="size-6"/> : 
                    <SunIcon className="size-7"/>}
                </button>
            </div>
        </nav>
    )
}