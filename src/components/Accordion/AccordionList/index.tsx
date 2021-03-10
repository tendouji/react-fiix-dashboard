import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { 
    animations,
    colorRange,
    elementSizes, 
    fontSizes,
    gaps, 
    styleGroup
} from "../../../constants/layout";
import withMeiosis, { WithMeiosisProps } from "../../HOC";
import { AccordionListType, StyledColorProps } from "../../../models";


type AccordionListProps = AccordionListType & {
    className?: string,
}

const AccordionList: React.FC<AccordionListProps & WithMeiosisProps> = ({
    globalStates, 
    title, 
    children, 
    titleIcon,
    onClick,
    className,
}) => {
    const onShowHideBody = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!!onClick && typeof onClick === 'function') {
            onClick(e);
        }
    };
    
    return (
        <AccordionListWrapper 
            className={[
                "accordion-list",
                (!!className ? ' ' + className : '')
            ].join('')}
            themeColor={globalStates!.themeColor}
        >
            <div 
                className={[
                    "accordion-title",
                    (!titleIcon || titleIcon === '' ? ' no-icon' : '')
                ].join('')}
                onClick={onShowHideBody} 
            >
                <div className="icon"><i className="material-icons">{ titleIcon }</i></div>
                <div className="text">{ title }</div>
            </div>
            <div className="accordion-content">
                <div className="pad-wrapper">
                    {children}
                </div>
            </div>
        </AccordionListWrapper>
    );
};

export default withMeiosis(AccordionList);


const AccordionListWrapper = styled.div<StyledColorProps>`
    width: 100%;
    
    & .accordion-title {
        position: relative;
        display: flex;
        width: 100%;
        height: ${ elementSizes.AccordionTitleHeight };
        box-sizing: border-box;
        color: ${ props => lighten(colorRange.L2, props.themeColor.primaryColor) };
        cursor: pointer;
        align-items: center;

        & .icon {
            display: flex;
            width: ${ elementSizes.AccordionTitleHeight };
            height: ${ elementSizes.AccordionTitleHeight };
            margin-right: ${ gaps.XSmall };
            text-align: center;
            align-items: center;
            justify-content: center;
            
            & .material-icons {
                font-size: ${ fontSizes.XLarge };
            }
        }
        
        & .text {
            width: calc(100% - 2 * ${ elementSizes.AccordionTitleHeight });
            font-weight: 500;
            ${styleGroup.TextOverflow}
        }

        &:after {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            width: ${ elementSizes.AccordionTitleHeight };
            height: ${ elementSizes.AccordionTitleHeight };
            font-family: "Material Icons";
            font-size: ${ fontSizes.XLarge };
            justify-content: center;
            align-items: center;
            opacity: 1;
            content: "expand_more";
        }
    
        &:hover {
            background-color: ${ props => lighten(0.75, props.themeColor.grayColor!) };
        }

        &.no-icon {
            & .icon {
                display: none;
            }
        
            & .text {
                width: calc(100% - ${ elementSizes.AccordionTitleHeight });
                padding-left: ${ gaps.Common };
            }
        }    
    }

    & .accordion-content {
        height: 0;
        overflow: hidden;
        border-top: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
        transition: height ${ animations.Transition };
        
        & .pad-wrapper {
            padding: ${ gaps.Common }; 
        }
    }

    &.open {
        border-bottom: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };

        & .accordion-title {
            &:after {
                content: 'expand_less';
            }
        }

        & .accordion-content {
            overflow-y: auto;
        }
    }

    .content-no-padded & {
        & .accordion-content {
            & .pad-wrapper {
                padding: 0; 
            }
        }    
    }
                
    &:last-child {
        & .accordion-content {
            border-top: 0;
        }

        &.open {
            border-bottom: 0;
            
            & .accordion-content {
                border-top: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
            }
        }
    }
`;