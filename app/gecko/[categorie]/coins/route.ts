import { makeServerReq } from "@/api/makeReq";
import { getCgCoinsListByCateRoute } from "@/api/ressources";

export function GET(request:Request, context: { params: { categorie:string } }){
    const url = getCgCoinsListByCateRoute(context.params.categorie);
    return makeServerReq(url, "GET");
}