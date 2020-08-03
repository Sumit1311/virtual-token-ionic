export default class RenewLoginRequest {
    token: string = "";

    setToken(token: string) {
        this.token = token;
        return this;
    }

    getRequestBody() {
        return {
            jwtToken: this.token
        }
    }
}