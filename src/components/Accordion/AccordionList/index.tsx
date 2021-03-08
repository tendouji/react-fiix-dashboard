import React, { useRef } from "react";
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
    defaultOpen,
    maxContentHeight,
    className
}) => {
    let contentHeight = 0;
    const listContainerRef = useRef<HTMLDivElement>(null);
    const listContainer: HTMLDivElement = listContainerRef.current!;
    const listBodyRef = useRef<HTMLDivElement>(null);
    const listBody: HTMLDivElement = listBodyRef.current!;

    const onShowHideBody = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if( listContainer.classList.contains('open') ) {
            collapseSection();
        } else {
            expandSection();
        }
    };

    const collapseSection = () => {
        const elementTransition = listBody.style.transition;
    
        listBody.style.transition = '';
        
        requestAnimationFrame(() => {
            listBody.style.height = contentHeight + 'px';
            listBody.style.transition = elementTransition;
            
            requestAnimationFrame(() => {
                listBody.style.height = 0 + 'px'
                listBody.style.removeProperty('height');
            });
        });
    
        listContainer.classList.remove('open');
    };

    const expandSection = () => {
        listContainer.classList.add('open');
        listBody.style.height = contentHeight + 'px';

        const listenerFunc = () => {
            listBody.removeEventListener('transitionend', listenerFunc);
        };
        listBody.addEventListener('transitionend', listenerFunc);
    };

    const getListBodyHeight = () => {
        if(!!listBody) {
            // NOTE: 
            // initial page load return wrong scrollHeight due to font family issue
            // there should be a better way to handle delay load instead of setTimeout
            // perhaps do proper font load done listener before entire app starts

            setTimeout(() => {
                const innerContent = listBody.getElementsByClassName('pad-wrapper')[0];
                contentHeight = (innerContent.scrollHeight !== listBody.scrollHeight) ? innerContent.scrollHeight : listBody.scrollHeight;
                if(!!maxContentHeight) {
                    contentHeight = maxContentHeight < listBody.scrollHeight ? maxContentHeight : listBody.scrollHeight;
                }
                if(!!defaultOpen) expandSection();
            }, 400);
        }
    }
    
    getListBodyHeight();
    window.addEventListener('resizeEnd', (e:Event) => {
        getListBodyHeight();
    });

    return (
        <AccordionListWrapper 
            className={[
                "accordion-list",
                (!!defaultOpen ? ' open' : ''), 
                (!!className ? ' ' + className : '')
            ].join('')}
            themeColor={globalStates!.themeColor}
            ref={listContainerRef} 
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
            <div 
                className="accordion-content" 
                ref={listBodyRef}
            >
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
    border-bottom: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
    
    &:last-child {
        border-bottom: 0;
    }

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
        transition: height ${ animations.Transition };
        
        & .pad-wrapper {
            padding: ${ gaps.Common }; 
            border-top: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
        }
    }

    &.open {
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
`;