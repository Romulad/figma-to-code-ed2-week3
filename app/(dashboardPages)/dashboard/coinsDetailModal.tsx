"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

import { fetchCoinsMarketChart } from "@/api/actions"
import { MarketChartData } from "@/api/definitions"
import { XIcon } from "@/assets/iconComponents"
import { Overlay, SimpleSkeleton } from "@/components"

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
    const [fetchingHistoryData, setFetchingHistoryData] = useState<boolean>(false);
    const [fetchingCoinsData, setFetchingCoinsData] = useState<boolean>(false);
    const [coinMarketChartData, setCoinMarketChartData] = useState<MarketChartData>({prices: []});

    useEffect(()=>{
        const bodyEl = document.querySelector('body');

        if(showDetailModal){
            setFetchingHistoryData(true);
            fetchCoinsMarketChart(coinId)
            .then((resp)=>{
                setFetchingHistoryData(false);
                if(resp){
                    setCoinMarketChartData(resp);
                }
            })
        }

        if(showDetailModal){
            bodyEl?.classList.add('overflow-hidden')
        }else{
            bodyEl?.classList.remove('overflow-hidden')
        }

    }, [showDetailModal])

    return(
        <>
        <Overlay 
        onOverlayClick={closeModal}
        showOverlay={showDetailModal}/>
        <div className={`p-5 z-[9970] shadow-xl fixed top-0 h-full rounded-tl-xl rounded-bl-xl bg-white dark:bg-dark w-full min-[500px]:w-[450px] 
        ${showDetailModal ? "right-0" : "-right-full"} duration-500 linear overflow-auto`}>
            <div className="flex justify-between items-center mb-8">
                <h4 className="font-semibold text-md">
                    Bitcoin
                </h4>
                <button className="bg-slate-200 dark:bg-slate-800 p-2 rounded-xl"
                onClick={closeModal}>
                    <XIcon className="size-5"/>
                </button>
            </div>

            <div className="flex justify-center">
                {fetchingHistoryData ?
                <SimpleSkeleton /> :
                <Chart 
                type="line"
                options={{
                    chart:{
                        animations: {
                            enabled: false
                        }
                    },
                    xaxis: {
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        type: 'numeric'
                    }
                }}
                series={[{
                    data: coinMarketChartData.prices, name: "Bitcoin", color: "#22c55e"
                }]}
                height={300}
                />
                }
            </div>

        </div>
        </>
    )
}