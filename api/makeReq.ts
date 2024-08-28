

export default async function makeReq(
    method: string, url: string, data: {} = {}, headers: {} = {}
){
    try{
        const resp = await fetch(url,
            {
                method,
                headers: {
                    ...headers,
                    'x-cg-demo-api-key': `${process.env.NEXT_PUBLIC_GECKO_API_KEY}`
                },
                // body: JSON.stringify(data)
            }
        )

        if(resp.ok){
            const data = await resp.json();
            return data;
        }
        
        throw new Error(`Http response with ${resp.status} status code`)
    }catch(e){
        throw new Error(`Error: ${e}`)
    }
}