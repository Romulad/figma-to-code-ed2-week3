"use client"

import { useContext, useState } from "react";

import { 
    AddWalletIcon, 
    ChevronDownIcon, 
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
        <nav className="sticky top-0 flex justify-between items-center border-b py-3 px-6
        max-[460px]:text-sm">
            <div className="flex items-center gap-14">
                <div className="flex lg:block items-center gap-2 min-[460px]:gap-6">
                    <button className="lg:hidden border border-gray-500 p-2 rounded-xl"
                    onClick={setSidebarState}>
                        <HamburguerIcon />
                    </button>

                    <div className="flex-col gap-1 hidden min-[390px]:flex">
                        <h1 className="font-medium">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-600">
                            Welcome back, John Doe !
                        </p> 
                    </div>
                </div>

                <button className="bg-blue-500 text-white hidden min-[680px]:flex items-center gap-2 px-5 py-2 rounded-xl font-medium
                hover:bg-blue-600">
                    <AddWalletIcon />
                    <span>Connect wallet</span>
                </button>
            </div> 

            <div className="flex gap-3 text-gray-500">
                <div className="relative">
                    <button className="flex items-center gap-3 rounded-xl border text-sm
                    focus:border-2 py-3 px-2 min-[460px]:py-1 px-4" 
                    onClick={()=>{setCurrencyIsOpen(!currencyIsOpen)}}>
                        <span>
                            USD
                        </span>
                        <div className="flex-col hidden min-[460px]:flex">
                            <ChevronDownIcon className="rotate-180"/>
                            <ChevronDownIcon />
                        </div>
                    </button>

                    <ul className={`${currencyIsOpen ? "block" : "hidden"}
                    bg-white absolute left-0 py-1 mt-3 w-full shadow-lg rounded-xl 
                    text-gray-900 divide-y text-sm`}>
                        {["CAD", "EUR", "XCD"]
                        .map((currenc, index)=>(
                            <li key={index}>
                                <button className="px-3 py-2 text-center w-full hover:bg-blue-100">
                                    {currenc}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="flex items-center px-2 border focus:border-2 rounded-xl "
                onClick={setTheme}>
                    {theme === themeMode.light ?
                    <MoonIcon className="size-6"/> : 
                    <SunIcon className="size-7"/>}
                </button>
            </div>
        </nav>
    )
}