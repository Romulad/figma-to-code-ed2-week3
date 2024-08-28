import { Metadata } from "next"

import AccountTrendingSection from "./accountTrendingSection";

export const metadata : Metadata = {
    title: "Dashboard"
}

export default function DashboardPage(){

    return(
        <>
            <AccountTrendingSection />
        </>
    )
}