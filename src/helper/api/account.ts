import AuthenticatedClient from "./AuthenticatedClient";
import { AxiosInstance } from "axios";

export default class AccountAPIHelper {
    private apiClient: AxiosInstance | null = null;

    private async getClient() {
        if (this.apiClient != null) {
            return this.apiClient;
        }
        return (this.apiClient = await AuthenticatedClient.getAuthenticatedClient());
    }

    async getAccount() {
        let client = await this.getClient();
        let response = await client.get("/accounts");

        if (response.data.status >= 400) {
            throw new Error(response.data.body.error);
        }
        return response.data.body
    }
}