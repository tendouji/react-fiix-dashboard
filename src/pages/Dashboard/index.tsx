import React from "react";
import withMeiosis, { WithMeiosisProps } from "../../components/HOC";

type DashboardProps = {
    className?: string,
    // onShowHide?: () => void,
}

const Dashboard: React.FC<DashboardProps & WithMeiosisProps> = ({className}) => {
    return <div className="dashboard">
        dashboard here
    </div>;
}

export default withMeiosis(Dashboard);
