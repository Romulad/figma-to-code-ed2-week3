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

export type CategoriesData = {
    category_id: string,
    name: string
}[]

export type CoinListData =  {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    market_cap: number,
    market_cap_rank: number,
    total_volume: Number,
    price_change_percentage_24h: number,
    sparkline_in_7d: {
      price: number[]
    },
    price_change_percentage_7d_in_currency: number | null
}[]