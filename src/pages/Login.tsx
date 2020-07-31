import React, { FormEvent } from "react";
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton } from "@ionic/react";
import UsersAPIHelper from "../helper/api/users";
import LoginRequest from "../helper/api/requests/LoginRequest";

class Login extends React.Component<any, any> {
    private users: UsersAPIHelper;

    constructor(props: any) {
        super(props);
        this.state = {
            mobileNo: "",
            password: "",
            isSubmitting: false
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
        event.preventDefault();
        this.setState({ isSubmitting: true });
        try {
            let response = await this.users.login(new LoginRequest()
                .setUserName(this.state.mobileNo)
                .setPassword(this.state.password));
            localStorage.setItem("token", response.jwtToken);
            this.props.onLoginSuccess();
        } catch (error) {
            console.log(error);
        }
        this.setState({ isSubmitting: false });
    }

    render() {
        return <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        Sign In
                </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={this.onSubmit}>
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
            </IonContent>
        </>
    }
}

export default Login;