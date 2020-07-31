import React from "react";
import { IonHeader, IonToolbar, IonContent, IonButton, IonText } from "@ionic/react";

class Home extends React.Component<any> {
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
                <IonText color="tertiary">
                    <h1>Virtual Token Management</h1>
                </IonText>
            </IonContent>
        </>
    }
}

export default Home;