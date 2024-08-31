import { makeServerReq } from "@/api/makeReq";
import { getCgCoinsListRoute } from "@/api/ressources";

export async function GET(){
    const url = getCgCoinsListRoute();
    return await makeServerReq(url, "GET");
}