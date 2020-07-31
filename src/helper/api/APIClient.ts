import axios from "axios";
import constants from "../../constants";

export default class APIClient {
    private static host: string = constants.API_HOST;

    static getClient() {
        return axios.create({
            baseURL: APIClient.host + '/api/v1/'
        });
    }
}