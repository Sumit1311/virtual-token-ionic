import React from 'react';
import { IonContent, IonList, IonItemDivider, IonItem, IonInput } from '@ionic/react';

class AdminSettings extends React.Component<any, any> {
    render() {
        let account = this.props.account;
        return <IonContent>
            <IonList>
                <IonItemDivider>Account Name</IonItemDivider>
                <IonItem>
                    <IonInput value={account.name} readonly ></IonInput>
                </IonItem>
                <IonItemDivider>Missed Call Number</IonItemDivider>
                <IonItem>
                    <IonInput value={account.missedCallNumber} readonly ></IonInput>
                </IonItem>
            </IonList>
        </IonContent>
    }
}

export default AdminSettings;