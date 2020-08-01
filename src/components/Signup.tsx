import React, { FormEvent } from "react";
import { IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton } from "@ionic/react";
import UsersAPIHelper from "../helper/api/users";
import SignupRequest from "../helper/api/requests/SignupRequest";
import NotificationToast from "./MessageToast";

class Signup extends React.Component<any, any> {

    private users: UsersAPIHelper;

    constructor(props: any) {
        super(props);
        this.state = {
            mobileNo: "",
            password: "",
            orgName: "",
            isSubmitting: false,
            errorText: ""
        }
        this.users = new UsersAPIHelper();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onChange(event: any) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({ [name]: value });
    }

    async onSubmit(event: FormEvent) {
        event.preventDefault();
        this.hideErrorText();
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
            this.showErrorText(error.message);
            console.log(error);
        }
        this.setState({ isSubmitting: false });
        this.props.onHideLoader();
    }

    render() {
        return <>
            <form onSubmit={this.onSubmit}>
                {this.getNotificationToast()}
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

        </>
    }
}

export default Signup;