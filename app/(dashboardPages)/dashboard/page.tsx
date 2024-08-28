import { Metadata } from "next"

import AccountTrendingSection from "./accountTrendingSection";
import CryptosTableSection from "./cryptoTableSection";

export const metadata : Metadata = {
    title: "Dashboard"
}

export default function DashboardPage(){

    return(
        <>
        <AccountTrendingSection />
        <CryptosTableSection />
        </>
    )
}