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

type HeaderProps = {
    className?: string,
}

const Header: React.FC<HeaderProps & WithMeiosisProps> = ({globalStates, className}) => {
    return (
        <HeaderWrapper className="header" themeColor={globalStates!.themeColor}>
            <div className="notification-section">
                <Notification />
            </div>
        </HeaderWrapper>
    );
};

export default withMeiosis(Header);


const HeaderWrapper = styled.header<StyledColorProps>`
    display: flex;
    height: ${ elementSizes.HeaderHeight };
    padding: 0 ${ gaps.XSmall } 0 ${ gaps.Common }; 
    background-color: ${ props => lighten(colorRange.L3, props.themeColor.secondaryColor) };
    align-items: center;

    & .notification-section {
        margin-left: auto;
    }
`;