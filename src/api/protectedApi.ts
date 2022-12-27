import {axiosInstance} from "#app/api/index";

const protectedApi = {
    getCoins() {
        return axiosInstance.get('https://api.coinranking.com/v2/coins');
    },
}

export default protectedApi;
