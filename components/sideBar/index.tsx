"use client"

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import logo from "@/assets/icons/logo.svg";
import { 
    ChevronDownIcon,
    ReportsIcon,
    XIcon,
} from "@/assets/iconComponents";
import { sideBarIcons } from "@/assets/sideBarIcons";
import { 
    activitiesPageUrl,
    billingPageUrl,
    cardsPageUrl,
    dashboardPageUrl,
    helpCenterPageUrl, 
    invoicesPageUrl, 
    newsPageUrl, 
    notifPageUrl, 
    reportsPageUrl,
    settingsPageUrl
} from "@/lib/urls";
import { sidebarStateContext } from "@/lib/context";

type SideBarItem = {
    name: string,
    path: string,
    icon: string,
    whiteIcon: string,
    isDropdown?: boolean,
    dropdownItems?: { name: string, path: string }[]
}

type SideBarData = SideBarItem[]

const sideBarData : SideBarData = [
    {
        name : "Dashboard",
        path: dashboardPageUrl,
        icon: sideBarIcons.dashboard.src,
        whiteIcon: sideBarIcons.dashboard.whiteSrc
    },
    {
        name : "News",
        path: newsPageUrl,
        icon: sideBarIcons.news.src,
        whiteIcon: sideBarIcons.news.whiteSrc
    },
    {
        name : "Activities",
        path: activitiesPageUrl,
        icon: sideBarIcons.activities.src,
        whiteIcon: sideBarIcons.activities.whiteSrc
    },
    {
        name : "Cards",
        path: cardsPageUrl,
        icon: sideBarIcons.cards.src,
        whiteIcon: sideBarIcons.cards.whiteSrc
    },
    {
        name : "Reports",
        path: reportsPageUrl,
        icon: sideBarIcons.reports.src,
        whiteIcon: sideBarIcons.reports.whiteSrc,
        isDropdown: true,
        dropdownItems: [
            { name: "Report type 1", path: "" },
            { name: "Report type 2", path: "" }
        ]
    },
    {
        name : "Notifications",
        path: notifPageUrl,
        icon: sideBarIcons.notif.src,
        whiteIcon: sideBarIcons.notif.whiteSrc
    },
    {
        name : "Billing",
        path: billingPageUrl,
        icon: sideBarIcons.billing.src,
        whiteIcon: sideBarIcons.billing.whiteSrc
    },
    {
        name : "Invoices",
        path: invoicesPageUrl,
        icon: sideBarIcons.invoice.src,
        whiteIcon: sideBarIcons.invoice.whiteSrc
    },
    {
        name : "Help center",
        path: helpCenterPageUrl,
        icon: sideBarIcons.helpCenter.src,
        whiteIcon: sideBarIcons.helpCenter.whiteSrc
    },
    {
        name : "Settings",
        path: settingsPageUrl,
        icon: sideBarIcons.settings.src,
        whiteIcon: sideBarIcons.settings.whiteSrc
    },
]

const DropdownSidebarItem = (
    {currentPathname, sideBarItem} : { currentPathname: string,  sideBarItem: SideBarItem}
) =>{
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="relative">
            <button className={`flex justify-between gap-2 items-center rounded-xl p-3 w-full 
            ${currentPathname === sideBarItem.path ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
            onClick={()=>{setIsOpen(!isOpen)}}>
                <div className="flex gap-3 items-center">
                    <ReportsIcon />
                    <span>
                        {sideBarItem.name}
                    </span>
                </div>
                <ChevronDownIcon 
                className={`duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}/>
            </button>
            <ul className={`${isOpen ? "flex" : "hidden"} flex-col gap-1 my-4 p-1 rounded-xl shadow-lg absolute bg-white w-full left-0`}>
                {sideBarItem.dropdownItems
                ?.map((item, index)=>(
                    <li key={index}>
                        <Link  href={item.path}
                        className="hover:bg-blue-100 p-3 rounded-xl w-full block">
                            {item.name}
                        </Link>
                    </li>      
                ))}
            </ul>
        </div> 
    )
}

export default function SideBar(){
    const [currentPathname, setCurrentPathname] = useState<string>("")
    const pathname = usePathname();
    const { sidebarState, setSidebarState } = useContext(sidebarStateContext);

    useEffect(()=>{
        setCurrentPathname(pathname)
    }, [pathname])

    return(
        <>
            <div className={`fixed top-0 w-64 h-full bg-white border-r pt-4 flex flex-col
            ${sidebarState ? " left-0 " : " -left-full"} lg:left-0 duration-300 sm:duration-500 ease-linear z-[999]
            shadow-xl lg:shadow-none`}>
                <div className="flex">
                    <Link
                    href={dashboardPageUrl}
                    className="ps-4">
                        <Image 
                        alt="Tokena"
                        src={logo}/>
                    </Link>
                </div>

                <div className="mt-8 mb-4 px-4 flex items-center justify-between">
                    <h2 className="text-gray-500">
                        Menu
                    </h2>
                    <button className="lg:hidden bg-slate-100 p-1 rounded-lg focus:border-2"
                    onClick={setSidebarState}>
                        <XIcon />
                    </button>
                </div>

                <div className="grow flex flex-col justify-between overflow-auto">
                    <ul className="flex flex-col gap-1 text-sm font-medium 
                    grow overflow-auto px-4 pt-3">
                        {sideBarData
                        .map((sideBarItem, index)=>(
                        <li key={index}>
                            {sideBarItem.isDropdown ?
                            <DropdownSidebarItem 
                            currentPathname={currentPathname} 
                            sideBarItem={sideBarItem}/> :

                            <Link href={sideBarItem.path}
                            className={`flex gap-3 items-center rounded-xl p-3 
                            ${currentPathname === sideBarItem.path ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}>
                                {currentPathname === sideBarItem.path ?
                                <Image
                                alt={sideBarItem.name}
                                src={sideBarItem.whiteIcon}/> :
                                <Image
                                alt={sideBarItem.name}
                                src={sideBarItem.icon}/>}

                                <span>
                                    {sideBarItem.name}
                                </span>
                            </Link>}
                        </li>
                        ))}
                    </ul>
                    
                    <div className="p-2">
                        <button className="text-start flex gap-2 items-center 
                        hover:bg-blue-100 rounded-lg p-2">
                            <div className="p-6 bg-slate-200 rounded-full ">
                            </div>
                            
                            <div className="grow flex justify-between gap-2 items-center">
                                <div className="flex flex-col gap-1 text-xs">
                                    <span className="font-medium">
                                        Romuald oluwatobi
                                    </span>
                                    <span className="text-gray-500">
                                        youremail@example.com
                                    </span>
                                </div>
                                <ChevronDownIcon />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[998] ${sidebarState ? "block" : "hidden"} lg:hidden`}
            onClick={setSidebarState}></div>
        </>
    )
}