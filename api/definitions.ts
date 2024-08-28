export type TrendingData = {
    "coins": {
        "item": {
            "id": string,
            "coin_id": number,
            "name": string,
            "symbol": string,
            "market_cap_rank": number,
            "thumb": string,
            "slug": string,
            "price_btc": number,
            "data": {
                "price": number,
                "price_btc": string,
                "price_change_percentage_24h": {
                    "btc": number,
                    "usd": number,
                },
                "market_cap": string,
                "market_cap_btc": string,
                "total_volume": string,
                "total_volume_btc": string,
                "sparkline": string,
            }
        }
    }[]
}