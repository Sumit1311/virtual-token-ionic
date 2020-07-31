import React, { FormEvent } from "react";
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton } from "@ionic/react";
import UsersAPIHelper from "../helper/api/users";
import SignupRequest from "../helper/api/requests/SignupRequest";

class Signup extends React.Component<any, any> {

    private users: UsersAPIHelper;

    constructor(props: any) {
        super(props);
        this.state = {
            mobileNo: "",
            password: "",
            orgName: "",
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
        this.props.onShowLoader();
        this.setState({ isSubmitting: true });
        try {
            await this.users.register(new SignupRequest()
                .setMobileNo(this.state.mobileNo)
                .setPassword(this.state.password)
                .setOrgName(this.state.orgName));
            this.props.onHideLoader();
            this.props.onRegistrationSuccess();
        } catch (error) {
            console.log(error);
        }
        this.setState({ isSubmitting: false });
        this.props.onHideLoader();
    }

    render() {
        return <>
            <IonHeader>
                <IonToolbar>
                    <IonButton href="/home" color="primary" slot="end">Home</IonButton>
                    <IonButton href="/signup" color="primary" slot="end">Register</IonButton>
                    <IonButton href="/login" color="primary" slot="end">Sign in </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={this.onSubmit}>
                    <IonItem lines="inset">
                        <IonLabel position="floating">Organisation Name</IonLabel>
                        <IonInput type="text" name="orgName" value={this.state.orgName} onIonChange={this.onChange} required></IonInput>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position="floating">Mobile No</IonLabel>
                        <IonInput type="text" name="mobileNo" value={this.state.mobileNo} onIonChange={this.onChange} required></IonInput>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" name="password" value={this.state.password} onIonChange={this.onChange} required></IonInput>
                    </IonItem>
                    <IonRow>
                        <IonCol>
                            <IonButton type="submit" color="danger" expand="block">
                                Register
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </form>
            </IonContent>

        </>
    }
}

export default Signup;