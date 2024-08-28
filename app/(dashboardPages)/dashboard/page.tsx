import { Metadata } from "next"

import AccountTrendingSection from "./accountTrendingSection";
import CryptoTableSection from "./cryptoTableSection";

export const metadata : Metadata = {
    title: "Dashboard"
}

export default function DashboardPage(){

    return(
        <>
        <AccountTrendingSection />
        <CryptoTableSection />
        </>
    )
}