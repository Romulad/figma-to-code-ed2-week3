"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import logo from "@/assets/icons/logo.svg";
import { ChevronDownIcon } from "@/assets/iconComponents";
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


type SideBarData = {
    name: string,
    path: string,
    icon: string,
    whiteIcon: string
}[]

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
        whiteIcon: sideBarIcons.reports.whiteSrc
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

export default function SideBar(){
    const [currentPathname, setCurrentPathname] = useState<string>("")
    const pathname = usePathname();

    useEffect(()=>{
        setCurrentPathname(pathname)
    }, [pathname])

    return(
        <div className="fixed left-0 top-0 h-full bg-white border-r pt-4 flex flex-col">
            
            <Link
            href={dashboardPageUrl}
            className="px-4">
                <Image 
                alt="Tokena"
                src={logo}/>
            </Link>

            <div className="mt-8 mb-4 px-4">
                <h2 className="text-gray-500">
                    Menu
                </h2>
            </div>

            <div className="grow flex flex-col justify-between overflow-auto">
                <ul className="flex flex-col gap-1 text-sm font-medium 
                grow overflow-auto px-4 pt-3">
                    {sideBarData
                    .map((sideBarItem, index)=>(
                    <li key={index} className="w-">
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
                        </Link>
                    </li>
                    ))}
                </ul>
                
                <div className="p-2">
                    <button className="text-start flex gap-2 items-center 
                    hover:bg-blue-100 rounded-lg p-2">
                        <div className="p-6 bg-slate-200 rounded-full ">
                        </div>
                        
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1 text-sm">
                                <span className="font-medium">
                                    Romuald oluwatobi
                                </span>
                                <span className="text-gray-500">
                                    youremail@example.com
                                </span>
                            </div>

                            <button>
                                <ChevronDownIcon />
                            </button>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    )
}