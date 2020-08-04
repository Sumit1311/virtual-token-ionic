import React from "react";
import { IonHeader, IonToolbar, IonContent, IonButton, IonText, IonGrid, IonRow, IonCol, IonTitle } from "@ionic/react";
import "./Home.css";
import Login from "../components/Login";
import Signup from "../components/Signup";
import constants from "../constants";

class Home extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            showRegistration: false,
            showLogin: false,
            notificationText: ""
        }
        this.showLogin = this.showLogin.bind(this);
        this.showRegistration = this.showRegistration.bind(this);
        this.showRegistrationSuccess = this.showRegistrationSuccess.bind(this);
    }

    showRegistrationSuccess() {
        this.setState({
            showRegistration: false,
            showLogin: true,
            notificationText: constants.REGISTRATION_SUCCESS
        });
    }

    showLogin() {
        this.setState({
            showRegistration: false,
            showLogin: !this.state.showLogin
        })
    }

    showRegistration() {
        this.setState({
            showRegistration: !this.state.showRegistration,
            showLogin: false
        })
    }


    getLogin() {
        if (this.state.showLogin) {
            return <Login onShowLoader={this.props.onShowLoader} onHideLoader={this.props.onHideLoader} onLoginSuccess={this.props.onLoginSuccess}></Login>
        } else {
            return <></>;
        }
    }

    getSignup() {
        if (this.state.showRegistration) {
            return <Signup onShowLoader={this.props.onShowLoader} onHideLoader={this.props.onHideLoader} onRegistrationSuccess={this.showRegistrationSuccess}></Signup>;
        } else {
            return <></>;
        }
    }

    render() {
        let text = this.state.notificationText;
        return <>
            <IonHeader className="home-header">
                <IonToolbar color="primary">
                    <IonTitle><IonText>
                        <h1>Visitors EnQueue</h1>
                    </IonText></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="auth-form">
                <IonText color="primary" class="ion-margin">
                    {text}
                </IonText>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton color="primary" onClick={this.showLogin}>Login</IonButton>
                            {this.getLogin()}
                            <span className="divider line one-line">    </span>
                            <IonButton color="primary" onClick={this.showRegistration}>Register</IonButton>
                            {this.getSignup()}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    }
}

export default Home;