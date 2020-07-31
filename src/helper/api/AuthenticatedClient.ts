import axios from "axios";
import constants from "../../constants";

export default class AuthenticatedAPIClient {
    private static host: string = constants.API_HOST;

    static async getAuthenticatedClient() {
        let token = localStorage.getItem("token");
        if (!token) {
            /*let repsonse = await new UsersAPIHelper().login({
                userName: "7588415318",
                password: "123456"
            });
            localStorage.setItem("token", repsonse.jwtToken);
            token = repsonse.jwtToken;*/
            throw new Error(constants.LOGIN_FAILURE);
        }
        return axios.create({
            baseURL: AuthenticatedAPIClient.host + '/api/v1/',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
}