import { categoriesKey, coinsListKey, trendingKey } from "./constants";
import { CategoriesData, CoinListData, TrendingData } from "./definitions";
import makeReq from "./makeReq"
import { getCgCategoriesRoute, getCgCoinsListRoute, getCgTrendingRoute } from "./ressources"


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

export const fetchCategories = async () : Promise<CategoriesData | null> => {
    const categoriesData = localStorage.getItem(categoriesKey);
    if(categoriesData){
        return JSON.parse(categoriesData)
    }

    const url = getCgCategoriesRoute();
    const data = await makeReq('GET', url);
    if(data){
        localStorage.setItem(categoriesKey, JSON.stringify(data));
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
        localStorage.setItem(coinsListKey, JSON.stringify(data));
        return data
    }else{
        return null
    }
}