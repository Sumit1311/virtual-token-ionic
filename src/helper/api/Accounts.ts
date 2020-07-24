import APIClient from "./APIClient";
import { AxiosInstance } from "axios";

export default class AccountAPIHelper {
    private apiClient: AxiosInstance;
    constructor() {
        this.apiClient = APIClient.getClient();
    }
    async getCustomersInQueue(accountId: string) {
        let response = await this.apiClient.get("/accounts/customers", {
            params: { accountId }
        });

        if (response.status === 200 || response.status === 201) {
            return response.data.body
        } else {
            throw new Error(response.data.body.error);
        }
    }

    async callNextBatch(accountId: string) {
        let response = await this.apiClient.get("/accounts/call-customers", {
            params: { accountId }
        });

        if (response.status === 200 || response.status === 201) {
            return response.data.body
        } else {
            throw new Error(response.data.body.error);
        }
    }
}