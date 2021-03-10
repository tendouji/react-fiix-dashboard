import React from "react";
import withMeiosis, { WithMeiosisProps } from "../../../components/HOC";


type ComponentTableProps = {
    className?: string,
    // onShowHide?: () => void,
}

const ComponentTable: React.FC<ComponentTableProps & WithMeiosisProps> = ({globalActions, globalStates, className}) => {
    return <div className="component-table">
        
        
    </div>;
}

export default withMeiosis(ComponentTable);
