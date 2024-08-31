import { getCgCoinsMarketChartRoute } from "@/api/ressources";
import { makeServerReq } from "@/api/makeReq";

export function GET(request: Request, context: { params: { coinId: string }}){
    const url = getCgCoinsMarketChartRoute(context.params.coinId);
    return makeServerReq(url, 'GET');
}