import { makeServerReq } from "@/api/makeReq";
import { getCgCategoriesRoute } from "@/api/ressources";

export async function GET(){
    const url = getCgCategoriesRoute();
    return await makeServerReq(url, "GET");
}