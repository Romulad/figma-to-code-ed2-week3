import { geckoBaseRoute } from "./constants"

export const getCgTrendingRoute = () : string => {
    return `${geckoBaseRoute}search/trending`
}