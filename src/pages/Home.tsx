import React from "react";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";

class Home extends React.Component<any> {
    render() {
        return <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Virtual Token Management
                </IonTitle>
                <IonButton href="/signup" color="primary" slot="end">Register</IonButton>
                <IonButton href="/login" color="danger" slot="end">Sign in </IonButton>
                </IonToolbar>
                
            </IonHeader>
            <IonContent>
            </IonContent>
        </>
    }
}

export default Home;