export default class SignupRequest {
    orgName: string = "";
    mobileNo: string = "";
    password: string = "";

    setMobileNo(mobileNo: string) {
        this.mobileNo = mobileNo;
        return this;
    }

    setPassword(password: string) {
        this.password = password;
        return this;
    }

    setOrgName(orgName: string) {
        this.orgName = orgName;
        return this;
    }

    getRequestBody() {
        return {
            orgName: this.orgName,
            mobileNo: this.mobileNo,
            password: this.password
        }
    }
}