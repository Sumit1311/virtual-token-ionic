import React from 'react';
import { IonToast } from '@ionic/react';

class NotificationToast extends React.Component<any, any> {
    render() {
        return <IonToast
            animated={true}
            position="top"
            color="danger"
            isOpen={this.props.errorText ? true : false}
            message={this.props.errorText}
            duration={10000}
            buttons={[
                {
                    side: 'end',
                    icon: 'close',
                }
            ]}
        />
    }
}

export default NotificationToast;