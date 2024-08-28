import { geckoBaseRoute } from "./constants"

export const getCgTrendingRoute = () : string => {
    return `${geckoBaseRoute}search/trending`
}

export const getCgCategoriesRoute = () : string => {
    return `${geckoBaseRoute}coins/categories/list`
}

export const getCgCoinsListRoute = () : string => {
    return `${geckoBaseRoute}coins/markets?vs_currency=usd&per_page=250&sparkline=true`
}