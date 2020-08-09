import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { ellipse } from 'ionicons/icons';
import AdministratorConsole from './Administrator';
import WaitingQueue from './WaitingQueue';
import { Route, Redirect } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';

export default class Dashboard extends React.Component<any> {
    public static urlPath: string;
    render() {
        let account = this.props.account;
        let urlPath = Dashboard.urlPath;
        let match = this.props.match;
        console.log(`Dashboard path ${JSON.stringify(this.props.match)}`);
        console.log(`Dashboard path ${JSON.stringify(this.props.history)}`);
        return <IonReactRouter history={this.props.history}>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path={`${urlPath}/:tab(queue)`} exact={true} >
                        <WaitingQueue account={account} onShowLoader={this.props.onShowLoader} onHideLoader={this.props.onHideLoader} />
                    </Route>
                    <Route path={`${urlPath}/:tab(admin)`} exact={true} render={(props: any) => {
                        return <AdministratorConsole account={account} onShowLoader={this.props.onShowLoader} onHideLoader={this.props.onHideLoader} />
                    }}>
                    </Route>
                    <Route path={`${urlPath}/:tab(logout)`} exact={true} render={(props: any) => {
                        localStorage.removeItem("token");
                        window.location.reload();
                        return <></>
                    }}>
                    </Route>
                    <Route path={`${urlPath}`} render={() => { console.log("Redirect to admin"); return <Redirect to={`${urlPath}/admin`} ></Redirect> }} exact={true} />
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                    <IonTabButton tab="admin" href={`${urlPath}/admin`}>
                        <IonIcon icon={ellipse} />
                        <IonLabel>Configuration</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="queue" href={`${urlPath}/queue`}>
                        <IonIcon icon={ellipse} />
                        <IonLabel>Waiting Queue</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="logout" href={`${urlPath}/logout`}>
                        <IonIcon icon={ellipse} />
                        <IonLabel>Logout</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter >
    }
}