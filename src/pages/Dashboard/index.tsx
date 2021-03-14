import React, { useRef } from "react";
import Button from "../../components/Button";
import withMeiosis, { WithMeiosisProps } from "../../components/HOC";
import Notification from "../../services/notification";

type DashboardProps = {
    className?: string,
    // onShowHide?: () => void,
}

const Dashboard: React.FC<DashboardProps & WithMeiosisProps> = ({className}) => {
    const notificationTitleRef = useRef<HTMLInputElement>(null);
    const notificationMessageRef = useRef<HTMLInputElement>(null);

    const testNotification = () => {
        if(!!notificationTitleRef.current && !!notificationMessageRef.current) {
            const curTitle: string = notificationTitleRef.current.value;
            const curMessage: string = notificationMessageRef.current.value;
            const notification = new Notification(curTitle, curMessage);
            notification.blastNotification();
        }
    };

    return <div className="dashboard">
        <fieldset className="notification-form">
            <input type="text" ref={notificationTitleRef} id="notificationTitle" placeholder="Title" />
            <input type="text" ref={notificationMessageRef} id="notificationBody" placeholder="Message" />
        </fieldset>
        <Button onClick={testNotification}>Trigger Notification</Button>
    </div>;
}

export default withMeiosis(Dashboard);
