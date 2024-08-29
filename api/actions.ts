import { categoriesKey, coinsListKey, marketChartKey, trendingKey } from "./constants";
import { CategoriesData, CoinListData, MarketChartData, TrendingData } from "./definitions";
import makeReq from "./makeReq"
import { getCgCategoriesRoute, getCgCoinsListByCateRoute, getCgCoinsListRoute, getCgCoinsMarketChartRoute, getCgTrendingRoute } from "./ressources"

function lsSetter(key:string, data:any){
    try{
        localStorage.setItem(key, JSON.stringify(data));
    }catch(e){
        console.log(e)
    }
}

export const fetchTrendingData = async () : Promise<TrendingData | null> => {
    const trendingData = localStorage.getItem(trendingKey);
    if(trendingData){
        return JSON.parse(trendingData)
    }

    const url = getCgTrendingRoute();
    const data = await makeReq('GET', url);
    if(data){
        lsSetter(trendingKey, data)
        return data
    }else{
        return null
    }
}

export const fetchCategories = async () : Promise<CategoriesData | null> => {
    const categoriesData = localStorage.getItem(categoriesKey);
    if(categoriesData){
        return JSON.parse(categoriesData)
    }

    const url = getCgCategoriesRoute();
    const data = await makeReq('GET', url);
    if(data){
        lsSetter(categoriesKey, data);
        return data
    }else{
        return null
    }
}

export const fetchCoinsList = async () : Promise<CoinListData | null> => {
    const coinListData = localStorage.getItem(coinsListKey);
    if(coinListData){
        return JSON.parse(coinListData)
    }

    const url = getCgCoinsListRoute();
    const data = await makeReq('GET', url);
    if(data){
        lsSetter(coinsListKey, data);
        return data
    }else{
        return null
    }
}

export const fetchCoinsListByCate = async (cate:string) : Promise<CoinListData | null> => {
    const coinListData = localStorage.getItem(cate);
    if(coinListData){
        return JSON.parse(coinListData)
    }

    const url = getCgCoinsListByCateRoute(cate);
    const data = await makeReq('GET', url);
    if(data){
        lsSetter(cate, data);
        return data
    }else{
        return null
    }
}

export const fetchCoinsMarketChart = async (
    coinId: string
) : Promise<MarketChartData | null> => {

    const marketChartDatas = JSON.parse(
        localStorage.getItem(marketChartKey) || '{}'
    )
    const marketChartDataExists = Object.keys(marketChartDatas).length >  0

    if(marketChartDataExists){
        const coinsMarketChart = marketChartDatas[coinId];
        if(coinsMarketChart){
            return coinsMarketChart
        }
    }

    const url = getCgCoinsMarketChartRoute(coinId);
    const data = await makeReq("GET", url);

    if(data){
        if(marketChartDataExists){
            marketChartDatas[coinId] = data;
            lsSetter(marketChartKey, marketChartDatas);
        }else{
            const newMarketChart : Record<string, typeof data> = {};
            newMarketChart[coinId] = data;
            lsSetter(marketChartKey, newMarketChart);
        }
        return data
    }

    return null
}

