import { AxiosInstance } from "axios";
import APIClient from "./APIClient";
import LoginRequest from "./requests/LoginRequest";
import SignupRequest from "./requests/SignupRequest";
import constants from "../../constants"
import RenewLoginRequest from "./requests/RenewLoginRequest";

export default class UsersAPIHelper {
    private apiClient: AxiosInstance;

    constructor() {
        this.apiClient = APIClient.getClient();
    }

    async login(body: LoginRequest) {
        let response = await this.apiClient.post("/users/login", body.getRequestBody());

        if (response.data.status >= 400) {
            throw new Error(constants.LOGIN_FAILURE);
        }
        return response.data.body;
    }

    async renewLogin(body: RenewLoginRequest) {
        let response = await this.apiClient.post("/users/renew", body.getRequestBody());

        if (response.data.status >= 400) {
            throw new Error(constants.LOGIN_FAILURE);
        }
        return response.data.body;
    }

    async register(body: SignupRequest) {
        let response = await this.apiClient.post("/accounts/signup", body.getRequestBody());
        if (response.data.status >= 400) {
            throw new Error(response.data.body.error);
        }
        return response.data.body;
    }
}