import React from "react";
import withMeiosis, { WithMeiosisProps } from "../../components/HOC";
import NotificationForm from "../../components/Notification/NotificationForm";


type DashboardProps = {
    className?: string,
}

const Dashboard: React.FC<DashboardProps & WithMeiosisProps> = ({className}) => {
    return <div className="dashboard">
        <NotificationForm />
    </div>;
}

export default withMeiosis(Dashboard);
