"use client"
import dynamic from "next/dynamic"
import { useContext, useEffect, useState } from "react"

import { fetchCoinsData, fetchCoinsMarketChart } from "@/api/actions"
import { CoinsData, MarketChartData } from "@/api/definitions"
import { FavoriteIcon, XIcon } from "@/assets/iconComponents"
import { Overlay, SimpleSkeleton } from "@/components"
import { themeContext } from "@/lib/context"
import { themeMode } from "@/lib/constants"

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false,});

export default function CoinDetailModal(
    {
        showDetailModal,
        closeModal,
        coinId
    } : { 
        showDetailModal: boolean, 
        closeModal: () => void,
        coinId: string
    }
){
    const { theme } = useContext(themeContext);
    const [fetchingHistoryData, setFetchingHistoryData] = useState<boolean>(false);
    const [fetchingCoinsData, setFetchingCoinsData] = useState<boolean>(false);
    const [coinMarketChartData, setCoinMarketChartData] = useState<MarketChartData>({prices: []});
    const [coinsData, setCoinsData] = useState<CoinsData | Record<string, any>>({});

    useEffect(()=>{
        const bodyEl = document.querySelector('body');
        if(showDetailModal){
            setFetchingHistoryData(true);
            setFetchingCoinsData(true);
            fetchCoinsMarketChart(coinId)
            .then((resp)=>{
                setFetchingHistoryData(false);
                if(resp){
                    setCoinMarketChartData(resp);
                }
            });

            fetchCoinsData(coinId)
            .then((resp)=>{
                setFetchingCoinsData(false);
                if(resp){
                    setCoinsData(resp)
                }
            })
        }

        if(showDetailModal){
            bodyEl?.classList.add('overflow-hidden')
        }else{
            bodyEl?.classList.remove('overflow-hidden')
        }

    }, [showDetailModal])

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return(
        <>
        <Overlay 
        onOverlayClick={closeModal}
        showOverlay={showDetailModal}/>
        <div className={`p-5 z-[9970] shadow-xl fixed top-0 h-full rounded-tl-xl rounded-bl-xl bg-white dark:bg-dark w-full min-[550px]:w-[500px] 
        ${showDetailModal ? "right-0" : "-right-full"} duration-500 linear overflow-auto`}>
            <div className="flex justify-between items-center mb-8">
                {fetchingCoinsData ?
                <p className="grow p-2 rounded-full bg-slate-200 animate-pulse me-3"></p> :
                <h4 className="font-semibold text-md">
                    {coinsData.name}
                </h4>}
                <button className="bg-slate-200 dark:bg-slate-800 p-2 rounded-xl"
                onClick={closeModal}>
                    <XIcon className="size-5"/>
                </button>
            </div>

            <div className="flex justify-center">
                {fetchingHistoryData ?
                <SimpleSkeleton /> :
                <div className="w-[420px] mx-auto">
                    <Chart 
                    type="line"
                    options={{
                        stroke: {
                            curve: "straight",
                            width: 3
                        },
                        grid:{
                            xaxis:{
                                lines:{
                                    show: true
                                }
                            },
                            yaxis: {
                                lines:{
                                    show: true
                                }
                            }
                        },
                        tooltip: {
                            theme: theme
                        },
                        chart:{
                            toolbar: {
                                tools: {
                                    zoom: false,
                                    selection: false,
                                    reset: false,
                                    zoomin: false,
                                    zoomout: false,
                                    pan: false
                                }
                            }
                        },
                        xaxis: {
                            type: 'numeric',
                            labels: {
                                style: {
                                    colors: themeMode.dark === theme ? "#f1f5f9" : "#4b5563",
                                },
                                formatter(value, timestamp, opts) {
                                    const timestampValue = parseInt(value);
                                    const date = new Date(timestampValue);
                                    return months[date.getMonth()]
                                },
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: themeMode.dark === theme ? "#f1f5f9" : "#4b5563",
                                }
                            }
                        },
                    }}
                    series={[{
                        data: coinMarketChartData.prices, name: coinsData.name, color: "#22c55e"
                    }]}
                    height={300}
                    />

                    <div className="flex items-center gap-1 ms-16">
                        <div className="bg-green-500 w-8 h-2"></div>
                        <p>Price</p>
                    </div>
                </div>
                
                }
            </div>
            
            <div className="mt-10">
                {fetchingCoinsData ?
                <SimpleSkeleton /> :
                <>
                <div className="flex justify-between items-center font-medium">
                    <div className="items-center flex gap-2">
                        <img src={coinsData?.image?.thumb} alt={coinsData.name} 
                        className="size-8 rounded-full"/>
                        <span className="font-medium">
                            <span>{coinsData.name} </span>
                            <span className="uppercase">
                                ({coinsData.symbol}/usd)
                            </span>
                        </span>
                    </div>
                    
                    <div>
                        ${coinsData.market_data?.current_price?.usd.toFixed(2)}
                    </div>
                </div>
                
                <div className="mt-8 flex flex-col gap-2 text-md">
                    <div className="flex flex-wrap justify-between gap-2 capitalize">
                        <span>Crypto market rank</span>
                        <span className="bg-slate-100 dark:bg-gray-600 px-2 rounded-full text-sm flex items-center">
                            Rank #{coinsData.market_cap_rank}
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-between gap-2">
                        <span>Market cap</span>
                        <span className="text-gray-600 dark:text-gray-300">
                            {coinsData.market_data
                            ?.market_cap
                            ?.usd.toLocaleString("en-US", {style: "currency", currency: "USD"})}
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-between gap-2">
                        <span>Circulating supply</span>
                        <span className="text-gray-600 dark:text-gray-300">
                            {coinsData.market_data?.circulating_supply.toFixed(1)}
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-between gap-2">
                        <span className="capitalize">24 hour high</span>
                        <span className="text-gray-600 dark:text-gray-300">
                            {coinsData.market_data
                            ?.high_24h
                            ?.usd.toLocaleString("en-US", {style: "currency", currency: "USD"})}
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-between gap-2">
                        <span className="capitalize">24 hour low</span>
                        <span className="text-gray-600 dark:text-gray-300">
                            {coinsData.market_data
                            ?.low_24h
                            ?.usd.toLocaleString("en-US", {style: "currency", currency: "USD"})}
                        </span>
                    </div>
                </div>

                <div className="mt-8 crypto-descr">
                    <span className="font-medium">Description</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 duration-200 mt-3"
                    dangerouslySetInnerHTML={{__html: coinsData.description?.en || ""}}>
                    </p>
                </div>

                <button className="font-medium mt-8 rounded-xl w-full flex bg-blue-50 dark:bg-slate-900 text-blue-500 dark:text-blue-600 items-center justify-center p-2 dark:border dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <FavoriteIcon className="size-5"/>
                        <span>Add to favorites</span>
                    </div>
                </button>
                </>}
            </div>
        </div>
        </>
    )
}