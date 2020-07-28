import APIClient from "./APIClient";
import { AxiosInstance } from "axios";

export default class CustomerAPIHelper {
    private apiClient: AxiosInstance;
    constructor() {
        this.apiClient = APIClient.getClient();
    }
    
    async getCustomersInQueue(accountId: string) {
        let response = await this.apiClient.get("/customers", {
            params: { accountId }
        });

        if (response.status === 200 || response.status === 201) {
            return response.data.body
        } else {
            throw new Error(response.data.body.error);
        }
    }

    async callNextBatch(accountId: string) {
        let response = await this.apiClient.get("/customers/call", {
            params: { accountId }
        });

        if (response.status === 200 || response.status === 201) {
            return response.data.body
        } else {
            throw new Error(response.data.body.error);
        }
    }
}