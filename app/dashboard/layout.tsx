import { SideBar } from "@/components";

export default function DashboardLayout(
    { children } : { children: React.ReactNode }
){
    return(
        <>
        <SideBar />
        <main>{ children }</main>
        </>
    )
}