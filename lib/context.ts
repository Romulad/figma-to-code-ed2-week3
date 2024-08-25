import { createContext } from "react";

export const sidebarStateContext = createContext(
    { sidebarState:false, setSidebarState:()=>{} }
);