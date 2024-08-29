"use client"

import { ChevronDownIcon } from "@/assets/iconComponents";
import { useEffect, useState } from "react";

export default function DataSplitter(
    {
        datas, 
        setCurrentDatas, 
        rows
    } : {
        datas: any[], 
        setCurrentDatas: React.Dispatch<any>, 
        rows: number 
    }
){
    const [totalSrceen, setTotalSrceen] = useState<number>(0);
    const [totalSrceenArray, setTotalSrceenArray] = useState<number[]>([]);
    const [rowsPerScreen, setRowsPerScreen] = useState<number>(rows)
    const [currentScreen, setCurrentScreen]= useState<number>(1);
    const [previousScreen, setPreviousScreen] = useState<number>(0);

    useEffect(()=>{
        if(rows <= 0){
            setTotalSrceen(0);
            setTotalSrceenArray([]);
            setCurrentDatas([]);
            return;
        }

        setCurrentDatas(datas?.slice(0, rows));
        setCurrentScreen(1);
        setPreviousScreen(0);
        updateTotalScreen(rows);
    }, [rows, setCurrentDatas])

    useEffect(()=>{
        const totalScreen = updateTotalScreen(rowsPerScreen);
        if(currentScreen >= totalScreen){
            const currentRange = datas?.slice(
                (totalScreen - 1)*rowsPerScreen, (totalScreen)*rowsPerScreen
            )
            setCurrentDatas(currentRange);
            setPreviousScreen(totalScreen - 1)
            setCurrentScreen(totalScreen)
        }else{
            setCurrentDatas(datas?.slice(
                previousScreen*rowsPerScreen, currentScreen*rowsPerScreen
            ));
        }
        
    }, [datas])

    function updateTotalScreen(rows:number){
        if(rows >= datas?.length){
            setTotalSrceen(1);
            setTotalSrceenArray([1]);
            return 1;
        }

        let screens = datas?.length / rows;
        // check if it is a float
        let splitted = screens.toString().split('.')
        if(splitted.length > 1){
            screens = parseInt(screens.toString()) + 1
        }

        // create screen index array
        const screenIndexArray = Array.from(
            {length: screens}
        ).map((value, index)=> index+1 )

        setTotalSrceen(screens);
        setTotalSrceenArray(screenIndexArray);

        return screens;
    }

    function goToNextPage(){
        if(currentScreen === totalSrceen){
            return;
        }

        const nexScreen = currentScreen + 1
        const startIndex = rowsPerScreen * currentScreen;
        const stopIndex = rowsPerScreen * nexScreen;

        setCurrentDatas(datas.slice(startIndex, stopIndex));
        setCurrentScreen(nexScreen);
        setPreviousScreen(currentScreen)
    }

    function goToPreviousPage(){
        if(currentScreen === 1){
            return;
        }

        const backScreen = previousScreen - 1
        const startIndex = rowsPerScreen * backScreen;
        const stopIndex = rowsPerScreen * previousScreen;

        setCurrentDatas(datas.slice(startIndex, stopIndex));
        setCurrentScreen(previousScreen);
        setPreviousScreen(backScreen)
    }

    function goToXPage(x:number){
        if(currentScreen === x){
            // we are on the current screen already
            return;
        }

        const nexScreen = x
        const previousScreen = x - 1 
        const startIndex = rowsPerScreen * previousScreen;
        const stopIndex = rowsPerScreen * nexScreen;

        setCurrentDatas(datas.slice(startIndex, stopIndex));
        setCurrentScreen(nexScreen);
        setPreviousScreen(previousScreen)
    }

    function onrowsChange(e: any){
        if(e.target.value.length <= 0){
            return
        }

        const value = parseInt(e.target.value);
        if(isNaN(value)){
            e.target.value = "";
            return
        };
        
        setRowsPerScreen(value);
        if(value <= 0){
            setTotalSrceen(0);
            setTotalSrceenArray([]);
            setCurrentDatas([]);
            return;
        }

        const totalScreen = updateTotalScreen(value);
        if(currentScreen >= totalScreen){
            // show the lastest data range
            setCurrentDatas(
                datas.slice((totalScreen - 1)*value, totalScreen*value)
            )
            setCurrentScreen(totalScreen);
            setPreviousScreen(totalScreen - 1);
        }else{  
            // update data to show the current and previous range
            setCurrentDatas(
                datas.slice(previousScreen*value, currentScreen*value)
            )
        }
    }

    function onrowsBlur(e: any){
        if(e.target.value.length <= 0){
            e.target.value = rowsPerScreen
            return
        }

        const value = parseInt(e.target.value);
        if(!isNaN(value)){
            e.target.value = value;
            return
        };
    }

    const dataInfo = (
        <p className="text-sm">
            Showing {previousScreen*rowsPerScreen} to {currentScreen*rowsPerScreen -1} of {datas.length} results
        </p>
    )

    const inputRowsPerScreen = (
        <div className="flex justify-center items-center gap-x-2">
            <span className="text-gray-600 dark:text-white text-sm">Rows: </span>
            <input type="text" name="per-screen" id="per-screen" 
            className="border-2 dark:bg-transparent dark:border-gray-700 py-2 w-16 rounded-xl text-center"
            onChange={onrowsChange}
            defaultValue={rowsPerScreen}
            onBlur={onrowsBlur}/>
        </div>
    )

    return (
        datas?.length > 0 &&  
        <>   
        <div className="mt-10 lg:gap-14 xl:gap-24 flex items-center justify-center font-medium">

            <div className="hidden lg:block">
                {dataInfo}
            </div>

            {totalSrceen > 0 && 
            <div className="flex items-center gap-0 min-[300px]:gap-3 min-[340px]:gap-5 max-[340px]:text-xs">
                <button className="disabled:text-gray-600" onClick={goToPreviousPage}
                disabled={currentScreen === 1}>
                    <ChevronDownIcon className="rotate-90 size-4"/>
                </button>

                <div className="flex gap-x-1 items-center *:rounded-lg *:px-4 *:py-2 font-medium">
                    {
                        totalSrceen <= 4 ?
                            totalSrceenArray.map((value)=>(
                            <button className={
                            `${value === currentScreen ? "bg-blue-500 text-white" : 
                            "text-blue-500 dark:border-2 dark:border-gray-700"}`}
                            onClick={() => {goToXPage(value)}}
                            key={value}>
                                {value}
                            </button>
                        )) :
                
                        totalSrceen > 4 &&
                        <>
                            {
                                <button 
                                className={
                                    `${totalSrceenArray.at(0) === currentScreen ? 
                                    "bg-blue-500 text-white" : 
                                "text-blue-500 dark:border-2 dark:border-gray-700"}`
                                }
                                //@ts-ignore
                                onClick={() => {goToXPage(totalSrceenArray.at(0))}}>
                                    {totalSrceenArray.at(0)}
                                </button>
                            }
                            {
                                //@ts-ignore
                                currentScreen === totalSrceenArray.at(-2) - 1 &&
                                <span className="text-blue-500 dark:border-2 dark:border-gray-700">...</span>
                            }
                            {
                                currentScreen === totalSrceenArray.at(0) ||
                                currentScreen === totalSrceenArray.at(1) ||
                                currentScreen === totalSrceenArray.at(-1) ||
                                currentScreen === totalSrceenArray.at(-2) ?
                                <button 
                                className={
                                    `${totalSrceenArray.at(1) === currentScreen ? 
                                    "bg-blue-500 text-white" : 
                                    "text-blue-500 dark:border-2 dark:border-gray-700"}`
                                }
                                //@ts-ignore
                                onClick={() => {goToXPage(totalSrceenArray.at(1))}}>
                                    {totalSrceenArray.at(1)}
                                </button> : 
                                <button className={`bg-blue-500 text-white`}
                                onClick={() => {goToXPage(currentScreen)}}>
                                    {currentScreen}
                                </button> 
                            }
                            {
                                //@ts-ignore
                                currentScreen !== totalSrceenArray.at(-2) - 1 &&
                                <span className="text-blue-500 dark:border-2 dark:border-gray-700">...</span>
                            }
                            {
                                totalSrceenArray.slice(totalSrceen - 2).map((value)=>(
                                    <button 
                                    className={
                                        `${value === currentScreen ? 
                                        "bg-blue-500 text-white" : 
                                        "text-blue-500 dark:border-2 dark:border-gray-700"}`
                                    }
                                    onClick={() => {goToXPage(value)}} key={value}>
                                        {value}
                                    </button>
                                ))
                            }
                        </>
                    }
                </div>

                <button className="disabled:text-gray-600" onClick={goToNextPage}
                disabled={currentScreen === totalSrceen}>
                    <ChevronDownIcon className="-rotate-90 size-4"/>
                </button>
            </div>}

            <div className="hidden lg:block">
                {inputRowsPerScreen}
            </div>
        </div>

        <div className="mt-5 flex flex-wrap lg:hidden justify-center items-center gap-6 font-medium">
            {dataInfo}
            {inputRowsPerScreen}
        </div>
        </> 

    )
}