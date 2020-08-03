import AuthenticatedClient from "./AuthenticatedClient";
import { AxiosInstance } from "axios";
import constants from "../../constants";
import UsersAPIHelper from "./users";
import RenewLoginRequest from "./requests/RenewLoginRequest";

export default class CustomerAPIHelper {
    private apiClient: AxiosInstance | null = null;

    private async getClient() {
        if (this.apiClient != null) {
            return this.apiClient;
        }
        return (this.apiClient = await AuthenticatedClient.getAuthenticatedClient());
    }

    async getCustomersInQueue(): Promise<any> {
        let client = await this.getClient();
        let response = await client.get("/customers");

        if (response.data.status >= 400) {
            if (response.data.body.error.message === constants.JWT_EXPIRED) {
                let token = localStorage.getItem("token");
                let response = await new UsersAPIHelper().renewLogin(new RenewLoginRequest().setToken((token === null) ? "" : token))
                localStorage.setItem("token", response.jwtToken);
                this.apiClient = await AuthenticatedClient.getAuthenticatedClient();
                return this.getCustomersInQueue();
            }
            throw new Error(response.data.body.error);
        }
        return response.data.body
    }

    async callNextBatch() :Promise<any> {
        let client = await this.getClient();
        let response = await client.get("/customers/call");

        if (response.data.status >= 400) {
            if (response.data.body.error.message === constants.JWT_EXPIRED) {
                let token = localStorage.getItem("token");
                let response = await new UsersAPIHelper().renewLogin(new RenewLoginRequest().setToken((token === null) ? "" : token))
                localStorage.setItem("token", response.jwtToken);
                this.apiClient = await AuthenticatedClient.getAuthenticatedClient();
                return this.callNextBatch();
            }
            throw new Error(response.data.body.error);
        }
        return response.data.body
    }
}