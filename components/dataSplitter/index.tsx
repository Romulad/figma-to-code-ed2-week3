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

    return (
        datas?.length > 0 &&  
        <>   
        { 
            totalSrceen > 0 &&
            <div className="mt-10 flex items-center justify-around">
                <button className="disabled:text-gray-600" onClick={goToPreviousPage}
                disabled={currentScreen === 1}>
                    <ChevronDownIcon className="-rotate-90 size-4"/>
                </button>

                <div className="flex gap-x-1 *:rounded-lg *:px-3 *:py-2 
                *:shadow-md">
                    {
                        totalSrceen <= 4 ?
                            totalSrceenArray.map((value)=>(
                            <button className={
                            `${value === currentScreen ? "bg-blue-500 text-white" : 
                            "text-blue-500"}`}
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
                                   "text-blue-500"}`
                                }
                                //@ts-ignore
                                onClick={() => {goToXPage(totalSrceenArray.at(0))}}>
                                    {totalSrceenArray.at(0)}
                                </button>
                            }
                            {
                                //@ts-ignore
                                currentScreen === totalSrceenArray.at(-2) - 1 &&
                                <span>...</span>
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
                                    "text-blue-500"}`
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
                                <span>...</span>
                            }
                            {
                                totalSrceenArray.slice(totalSrceen - 2).map((value)=>(
                                    <button 
                                    className={
                                        `${value === currentScreen ? 
                                        "bg-blue-500 text-white" : 
                                        "text-blue-500"}`
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
                    <ChevronDownIcon className="rotate-90 size-4"/>
                </button>
            </div>
        }

        <div className="mt-6 flex justify-center items-center gap-x-2">
            <input type="text" name="per-screen" id="per-screen" 
            placeholder="Rows"
            className="border-0 w-16 rounded-lg text-center bg-slate-200 sm:bg-white"
            onChange={onrowsChange}
            defaultValue={rowsPerScreen}
            onBlur={onrowsBlur}/>
        </div>
        </> 

    )
}