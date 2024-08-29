import { categoriesKey, coinsListKey, trendingKey } from "./constants";
import { CategoriesData, CoinListData, TrendingData } from "./definitions";
import makeReq from "./makeReq"
import { getCgCategoriesRoute, getCgCoinsListByCateRoute, getCgCoinsListRoute, getCgTrendingRoute } from "./ressources"

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

