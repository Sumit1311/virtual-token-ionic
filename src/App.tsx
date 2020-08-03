import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AccountAPIHelper from './helper/api/account';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import constants from './constants';

class App extends React.Component {
  public state: any;
  public accounts: AccountAPIHelper;

  constructor(props: any) {
    super(props);
    this.state = {
      showLoader: true,
      isAuthenticated: false,
      account: null
    }
    this.accounts = new AccountAPIHelper();
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    await this.initPage();
  }

  async initPage() {
    this.showLoader();
    await this.getAccount();
    this.hideLoader();
  }

  async getAccount() {
    try {
      const account = await this.accounts.getAccount();
      this.setState({
        account,
        isAuthenticated: true
      });
    } catch (error) {
      this.logout();
    }
  }

  logout() {
    this.setState({
      isAuthenticated: false
    });
  }

  showLoader() {
    this.setState({
      showLoader: true
    });
  }

  hideLoader() {
    this.setState({
      showLoader: false
    });
  }

  getDashboard(match: any) {
    return <Dashboard match={match} account={this.state.account} onShowLoader={this.showLoader} onHideLoader={this.hideLoader} onLogout={this.logout} />
  }

  getHome() {
    return <Home onShowLoader={this.showLoader} onHideLoader={this.hideLoader} onLoginSuccess={async () => {
      await this.initPage();
    }}></Home>
  }

  render() {
    let dashboardUrl = Dashboard.urlPath = constants.DASHBOARD_URL;
    return <IonApp>
      <IonContent>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/home" render={() => {
              if (this.state.isAuthenticated) {
                return <Redirect to={`${dashboardUrl}`}></Redirect>
              }
              return this.getHome();
            }}></Route>
            <Route path={`${dashboardUrl}`} render={({ match }: any) => {
              if (this.state.isAuthenticated) {
                return this.getDashboard(match)
              }
              return <Redirect to="/home"> </Redirect>
            }} exact={true} />
            <Route path={`${dashboardUrl}/:tab`} render={({ match }: any) => {
              match.path = dashboardUrl;
              if (this.state.isAuthenticated) {
                return this.getDashboard(match);
              }
              return <Redirect to="/home"> </Redirect>
            }} exact={true} />
            <Route path="/" render={() => {
              return <Redirect to={`${dashboardUrl}`}></Redirect>
            }} exact={true} />
          </IonRouterOutlet>
        </IonReactRouter>

        <IonLoading
          isOpen={this.state.showLoader}
          message={'Please wait...'}
          duration={60000}
        />
      </IonContent>
    </IonApp>
  }
}

export default App;
