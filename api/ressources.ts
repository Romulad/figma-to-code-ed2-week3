import { geckoBaseRoute } from "./constants"

export const getCgTrendingRoute = () : string => {
    return `${geckoBaseRoute}search/trending`
}

export const getCgCategoriesRoute = () : string => {
    return `${geckoBaseRoute}coins/categories/list`
}

export const getCgCoinsListRoute = () : string => {
    return `${geckoBaseRoute}coins/markets?vs_currency=usd&per_page=250&sparkline=true&price_change_percentage=7d`
}

export const getCgCoinsListByCateRoute = (cate:string) : string => {
    return `${geckoBaseRoute}coins/markets?vs_currency=usd&category=${cate}&per_page=250&sparkline=true&price_change_percentage=7d`
}