import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { 
    colorRange,
    elementSizes, 
    gaps 
} from "../../constants/layout";
import Notification from "../Notification";
import { StyledColorProps } from "../../models";
import withMeiosis, { WithMeiosisProps } from "../HOC";

type TableProps = {
    tableData: any;
    className?: string,
}

const Table: React.FC<TableProps & WithMeiosisProps> = ({globalStates, className}) => {
    return (
        <TableWrapper className="table-responsive" themeColor={globalStates!.themeColor}>
            <div className="notification-section">
                <Notification />
            </div>
        </TableWrapper>
    );
};

export default withMeiosis(Table);


const TableWrapper = styled.table<StyledColorProps>`
    // display: flex;
    // height: ${ elementSizes.HeaderHeight };
    // padding: 0 ${ gaps.XSmall } 0 ${ gaps.Common }; 
    // background-color: ${ props => lighten(colorRange.L3, props.themeColor.secondaryColor) };
    // align-items: center;

    // & .notification-section {
    //     margin-left: auto;
    // }
`;