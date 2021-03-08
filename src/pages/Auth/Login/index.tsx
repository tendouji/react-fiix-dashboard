import React from "react";
import withMeiosis, { WithMeiosisProps } from "../../../components/HOC";

type LoginProps = {
    className?: string,
    // onShowHide?: () => void,
}

const Login: React.FC<LoginProps & WithMeiosisProps> = ({className}) => {
    return <div className="login">
        login here
    </div>;
}

export default withMeiosis(Login);
