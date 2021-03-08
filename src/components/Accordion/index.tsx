import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { 
    colorRange,
    elementSizes, 
} from "../../constants/layout";
import withMeiosis, { WithMeiosisProps } from "../HOC";
import { AccordionListType, StyledColorProps } from "../../models";
import AccordionList from "./AccordionList";

type AccordionProps = {
    listData: AccordionListType[],
    firstItemOpen?: boolean,
    maxContentHeight?: number,
    contentNoPadded?: boolean,
    className?: string,
}

const Accordion: React.FC<AccordionProps & WithMeiosisProps> = ({
    globalStates, 
    listData, 
    firstItemOpen, 
    maxContentHeight, 
    contentNoPadded,
    className
}) => {
    return (
        <AccordionWrapper 
            className={[
                "accordion", 
                (!!contentNoPadded ? ' content-no-padded' : ''),
                (!!className ? ' ' + className : '')
            ].join('')}
            themeColor={globalStates!.themeColor}
        >{ 
            listData.map((listItem: AccordionListType, index) => 
                <AccordionList 
                    title={listItem.title} 
                    titleIcon={listItem.titleIcon} 
                    { ...(!!firstItemOpen && index === 0 ? { defaultOpen: true } : {}) }
                    { ...(!!maxContentHeight ? { maxContentHeight } : {}) }
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