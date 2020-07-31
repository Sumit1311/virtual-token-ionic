export default class LoginRequest {
    userName: string = "";
    password: string = "";

    setUserName(username: string) {
        this.userName = username;
        return this;
    }

    setPassword(password: string) {
        this.password = password;
        return this;
    }

    getRequestBody() {
        return {
            userName: this.userName,
            password: this.password
        }
    }
}