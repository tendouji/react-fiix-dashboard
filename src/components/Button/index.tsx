import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { 
    colorRange,
    elementSizes, 
    fontSizes, 
    gaps 
} from "../../constants/layout";
import withMeiosis, { WithMeiosisProps } from "../HOC";
import { StyledColorProps } from "../../models";

type ButtonProps = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
}

const Button: React.FC<ButtonProps & WithMeiosisProps> = ({globalStates, children, onClick, className}) => {
    return (
        <ButtonWrapper 
            className={[
                "btn",
                (!!className ? ' ' + className : '')
            ].join('')}
            themeColor={globalStates!.themeColor}
            onClick={onClick}
        >{ children }</ButtonWrapper>
    );
};

export default withMeiosis(Button);


const ButtonWrapper = styled.button<StyledColorProps>`
    display: inline-flex;
    height: ${ elementSizes.ButtonHeight };
    padding: 0 ${ gaps.Common }; 
    color: #fff;
    line-height: 1;
    border: 0;
    border-radius: ${elementSizes.BorderRadius};
    text-transform: uppercase;
    font-family: 'Roboto', 'Arial', 'Helvetica Neue', sans-serif;
    background-color: ${props => props.themeColor.primaryColor};
    cursor: pointer;
    justify-content: center;
    align-items: center;

    & + .btn {
        margin-left: ${ gaps.XSmall };
    }

    & .material-icons {
        margin-left: ${gaps.XSmall};
        margin-right: -${gaps.XSmall};
        font-size: ${fontSizes.Large};
    }

    &:hover {
        background-color: ${props => lighten(colorRange.L2, props.themeColor.primaryColor)};
    }

    &.ghost {
        position: relative;
        color: ${props => props.themeColor.primaryColor};
        background: transparent;
        
        &:after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 2px solid ${props => props.themeColor.primaryColor};
            border-radius: ${elementSizes.BorderRadius};
            box-sizing: border-box;
            content: '';
        }

        &:hover {
            color: ${props => lighten(colorRange.L2, props.themeColor.primaryColor)};
            
            &:after {
                border: 2px solid ${props => lighten(colorRange.L2, props.themeColor.primaryColor)};
            }
        }
    }

    @media screen and (max-width: ${elementSizes.MediaScreenMediumWidth}) {
        padding: 0 ${ gaps.Small }; 
        font-size: ${fontSizes.Small};

        & .material-icons {
            margin-left: 0.2rem;
            margin-right: -0.2rem;
        }
    }
`;