import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { colorRange, elementSizes } from "../../constants/layout";
import withMeiosis, { WithMeiosisProps } from "../HOC";
import { AccordionListType, StyledColorProps } from "../../models";
import AccordionList from "./AccordionList";

type AccordionProps = {
    listData: AccordionListType[],
    firstItemOpen?: boolean,
    allowMultipleOpen?: boolean,
    maxContentHeight?: number,
    contentNoPadded?: boolean,
    className?: string,
}

const Accordion: React.FC<AccordionProps & WithMeiosisProps> = ({
    globalStates, 
    listData, 
    firstItemOpen, 
    allowMultipleOpen,
    maxContentHeight, 
    contentNoPadded,
    className
}) => {
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!!accordionRef.current) {
            const curAccordion = accordionRef.current;
            if(!!firstItemOpen) {
                // NOTE: 
                // initial page load return wrong scrollHeight due to font family issue
                // there should be a better way to handle delay load instead of setTimeout
                // perhaps do proper font load done listener before entire app starts

                setTimeout(() => {
                    const firstChild: HTMLDivElement = curAccordion.firstChild as HTMLDivElement;
                    openItem(firstChild);
                }, 400);
            }
        } 
    }, [firstItemOpen]);


    const getItemSiblings = (curElm: HTMLDivElement) => {
        let siblings: HTMLDivElement[] = []; 
        
        if(!accordionRef.current) {
            return siblings;
        }

        let child: HTMLDivElement = accordionRef.current.firstChild as HTMLDivElement;
        while(child) {
            if(child.nodeType === 1 && child !== curElm) {
                siblings.push(child);
            }
            child = child.nextSibling as HTMLDivElement;
        }
        return siblings;
    };

    const openItem = (curItem: HTMLDivElement) => {
        const curBody: HTMLDivElement = curItem.getElementsByClassName('accordion-content')[0] as HTMLDivElement;
        const curContent: HTMLDivElement = curBody.getElementsByClassName('pad-wrapper')[0] as HTMLDivElement;

        if( curItem.classList.contains('open') ) {
            curItem.classList.remove('open');
            curBody.removeAttribute('style');
        } else {
            curItem.classList.add('open');

            let contentHeight = curContent.offsetHeight;
            if(!!maxContentHeight) {
                contentHeight = maxContentHeight < contentHeight ? maxContentHeight : contentHeight;
            }
            curBody.style.height = contentHeight + 'px';

            if(!allowMultipleOpen) {
                const otherSiblings: HTMLDivElement[] = getItemSiblings(curItem);
                for(const child of otherSiblings) {
                    if(child.classList.contains('open')) {
                        child.classList.remove('open');
                        const childBody: HTMLDivElement = child.getElementsByClassName('accordion-content')[0] as HTMLDivElement;
                        childBody.removeAttribute('style');
                    }
                }
            }
        }
    }

    const onItemClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const curItem: HTMLDivElement = e.currentTarget.parentNode as HTMLDivElement;
        openItem(curItem);
    };

    const resizeOpenItem = () => {
        if(!!accordionRef.current) {
            const children: HTMLCollectionOf<Element> = accordionRef.current.getElementsByClassName('accordion-list');
            for(const child of children) {
                if(child.classList.contains('open')) {
                    const curItem: HTMLDivElement = child as HTMLDivElement;
                    const curBody: HTMLDivElement = curItem.getElementsByClassName('accordion-content')[0] as HTMLDivElement;
                    const curContent: HTMLDivElement = curBody.getElementsByClassName('pad-wrapper')[0] as HTMLDivElement;

                    let contentHeight = curContent.offsetHeight;
                    if(!!maxContentHeight) {
                        contentHeight = maxContentHeight < contentHeight ? maxContentHeight : contentHeight;
                    }
                
                    curBody.style.height = contentHeight + 'px';
                }
            }
        }
    };

    window.addEventListener('resizeEnd', (e: Event) => {
        resizeOpenItem();
    });
    window.addEventListener('showHideSideMenu', (e: Event) => {
        setTimeout(() => {
            // Only trigger resize after animation ends
            resizeOpenItem();
        }, 200);
    });

    return (
        <AccordionWrapper 
            className={[
                "accordion", 
                (!!contentNoPadded ? ' content-no-padded' : ''),
                (!!className ? ' ' + className : '')
            ].join('')}
            ref={accordionRef}
            themeColor={globalStates!.themeColor}
        >{ 
            listData.map((listItem: AccordionListType, index) => 
                <AccordionList 
                    testProp={`al-${index}`}
                    title={listItem.title} 
                    titleIcon={listItem.titleIcon} 
                    { ...(!!maxContentHeight ? { maxContentHeight } : {}) }
                    onClick={onItemClickHandler}
                    key={`al-${index}`}
                >{ listItem.children }</AccordionList>
            )
        }</AccordionWrapper>
    );
};

export default withMeiosis(Accordion);


const AccordionWrapper = styled.div<StyledColorProps>`
    width: 100%;
    max-width: ${elementSizes.AccordionMaxWidth};
    border: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
    border-radius: ${elementSizes.BorderRadius};
    background-color: #fff;
    overflow: hidden;
`;