
export const mergeData = (coins = [], exchangeRates = [], balances = []) => {
    const mergedData = [];
    // 过滤掉没有 'amount' 数据的 balances 项
    balances?.forEach(balance => {
        if (balance.amount != null) {
            const coin = coins.find(coin => coin.coin_id === balance.currency);
            const rateData = exchangeRates.find(rate => rate.from_currency === coin?.coin_id);

            // 如果找到了对应的 coin 和 rateData
            if (coin && rateData) {
                mergedData.push({
                    ...coin,
                    exchangeRate: rateData.rates[0].rate,
                    balance: balance.amount
                });
            }
        }
    });

    return mergedData;
}

export const getTotalBalanceInUSD = (data) => {
    return data.reduce((sum, item) => {
        const balance = Number(item.balance);
        const rate = Number(item.exchangeRate);
        const value = balance * rate;
        return sum + value;
    }, 0).toFixed(2);
}