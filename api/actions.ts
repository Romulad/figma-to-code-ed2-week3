import { trendingKey } from "./constants";
import { TrendingData } from "./definitions";
import makeReq from "./makeReq"
import { getCgTrendingRoute } from "./ressources"


export const fetchTrendingData = async () : Promise<TrendingData | null> => {
    const trendingData = localStorage.getItem(trendingKey);
    if(trendingData){
        return JSON.parse(trendingData)
    }

    const url = getCgTrendingRoute();
    const data = await makeReq('GET', url);
    if(data){
        localStorage.setItem(trendingKey, JSON.stringify(data));
        return data
    }else{
        return null
    }
}