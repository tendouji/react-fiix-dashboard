import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { 
    animations,
    colorRange,
    elementSizes, 
    fontSizes, 
    gaps 
} from "../../constants/layout";
import { appData } from "../../constants/app";
import { StyledColorProps } from "../../models";
import withMeiosis, { WithMeiosisProps } from "../HOC";

type FooterProps = {
    className?: string,
}

const Footer: React.FC<FooterProps & WithMeiosisProps> = ({globalStates, className}) => {
    return (
        <FooterWrapper className="footer" themeColor={globalStates!.themeColor}>
            <div className="icon">
                <span className="material-icons">copyright</span>
            </div>
            <div className="text">{ (new Date()).getFullYear() } { appData.title }</div>
        </FooterWrapper>
    );
};

export default withMeiosis(Footer);


const FooterWrapper = styled.footer<StyledColorProps>`
    display: flex;
    width: 100%; 
    height: ${ elementSizes.FooterHeight };
    border-top: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
    align-items: center;

    & .icon,
    & .text {
        display: flex;
        overflow: hidden;
        align-items: center;
    }

    & .icon {
        width: 1rem;
        height: ${ elementSizes.FooterHeight };
        padding: 0 0 0 ${ gaps.Small };
        justify-content: center;
        transition: all ${ animations.Transition };
        
        & .material-icons {
            font-size: ${ fontSizes.Small };    
            transition: font-size ${ animations.Transition };
        }
    }

    & .text {
        width: 100%;
        font-size: ${ fontSizes.Small };
        white-space: nowrap;
        box-sizing: border-box;
        transition: width ${ animations.Transition };
    }


    .menu-close & {
        & .icon {
            width: ${ elementSizes.MenuCloseWidth };
            padding: 0;
            
            & .material-icons {
                font-size: ${ fontSizes.XLarge };
            }
        }
        
        & .text {
            width: 0;
        }
    }

    .peek & {
        & .icon {
            width: 1rem;
            padding: 0 0 0 ${ gaps.Small };

            & .material-icons {
                font-size: ${ fontSizes.Small };    
            }
        }
        
        & .text {
            width: 100%;
        }
    }
`;