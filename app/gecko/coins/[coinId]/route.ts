import { makeServerReq } from "@/api/makeReq";
import { getCgCoinsDataRoute } from "@/api/ressources";

export async function GET(request: Request, context: { params: { coinId:string }}){
    const url = getCgCoinsDataRoute(context.params.coinId);
    return await makeServerReq(url, "GET")
}