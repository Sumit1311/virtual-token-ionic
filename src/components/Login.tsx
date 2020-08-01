import React, { FormEvent } from "react";
import { IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton} from "@ionic/react";
import UsersAPIHelper from "../helper/api/users";
import LoginRequest from "../helper/api/requests/LoginRequest";
import NotificationToast from "./MessageToast";

class Login extends React.Component<any, any> {
    private users: UsersAPIHelper;

    constructor(props: any) {
        super(props);
        this.state = {
            mobileNo: "",
            password: "",
            isSubmitting: false,
            errorText: null
        }
        this.users = new UsersAPIHelper();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event: any) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({ [name]: value });
    }

    async onSubmit(event: FormEvent) {
        this.hideErrorText();
        event.preventDefault();
        this.props.onShowLoader();
        this.setState({ isSubmitting: true });
        try {
            let response = await this.users.login(new LoginRequest()
                .setUserName(this.state.mobileNo)
                .setPassword(this.state.password));
            localStorage.setItem("token", response.jwtToken);
            this.props.onHideLoader();
            this.props.onLoginSuccess();
        } catch (error) {
            this.showErrorText(error.message);
            console.log(error);
        }
        this.setState({ isSubmitting: false });
        this.props.onHideLoader();
    }

    showErrorText(text: string) {
        this.setState({ errorText: text });
    }

    hideErrorText() {
        this.setState({ errorText: null });
    }

    getNotificationToast() {
        return <NotificationToast errorText={this.state.errorText} />
    }

    render() {
        return <>

            <form onSubmit={this.onSubmit}>
                {this.getNotificationToast()}
                <IonItem lines="inset">
                    <IonLabel position="floating">Mobile No</IonLabel>
                    <IonInput type="text" name="mobileNo" value={this.state.mobileNo} onIonChange={this.onChange} required></IonInput>
                </IonItem>
                <IonItem lines="inset">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" value={this.state.password} onIonChange={this.onChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="danger" expand="block" disabled={this.state.isSubmitting}>
                            Log In
                            </IonButton>
                    </IonCol>
                </IonRow>
            </form>
        </>
    }
}

export default Login;