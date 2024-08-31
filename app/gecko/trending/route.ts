import { makeServerReq } from "@/api/makeReq";
import { getCgTrendingRoute } from "@/api/ressources";

export async function GET(){
    const url = getCgTrendingRoute();
    return await makeServerReq(url, "GET");
}