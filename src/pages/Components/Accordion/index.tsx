import React from "react";
import styled from "styled-components";
import Accordion from "../../../components/Accordion";
import withMeiosis, { WithMeiosisProps } from "../../../components/HOC";
import { elementSizes, gaps } from "../../../constants/layout";
import { AccordionListType } from "../../../models";

type ComponentAccordionProps = {
    className?: string,
    // onShowHide?: () => void,
}

const ComponentAccordion: React.FC<ComponentAccordionProps & WithMeiosisProps> = ({globalActions, globalStates, className}) => {
    const getAccordionHandler = (type: string): AccordionListType[] => {
        let accordionData: AccordionListType[] = [];
        switch(type) {
            case 'basic': 
                accordionData = [{
                    title: 'Pellentesque venenatis at ligula et posuere',
                    children: <div>Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat</div>,
                }, {
                    title: 'Morbi non turpis bibendum ipsum cursus finibus',
                    children: <div>Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat<br /><br />Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat</div>,
                }, {
                    title: 'Integer id eros vel dolor lobortis condimentum',
                    children: <div>Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat<br /><br />Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat</div>,
                }];                    
            break;
            case 'with-icons': 
                accordionData = [{
                    title: 'Pellentesque venenatis at ligula et posuere',
                    children: <div>Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat</div>,
                    titleIcon: 'camera_enhance',
                }, {
                    title: 'Morbi non turpis bibendum ipsum cursus finibus',
                    children: <div>Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat<br /><br />Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat</div>,
                    titleIcon: 'build_circle',
                }, {
                    title: 'Integer id eros vel dolor lobortis condimentum',
                    children: <div>Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat<br /><br />Lorem ipsum dolor sit amet<br />consectetur adipiscing elit<br />sed do eiusmod tempor<br />incididunt ut labore<br />et dolore magna aliqua<br /><br />Ut enim ad minim veniam,<br />quis nostrud exercitation<br />ullamco laboris nisi ut<br />aliquip ex ea commodo consequat</div>,
                    titleIcon: 'lightbulb',
                }];
            break;
            case 'no-padded-content': 
                accordionData = [{
                    title: 'Pellentesque venenatis at ligula et posuere',
                    children: <ContentListWrapper className="content-list">
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>consectetur adipiscing elit</li>
                        <li>sed do eiusmod tempor incididunt ut labore</li>
                        <li>et dolore magna aliqua ut enim ad minim veniam</li>
                        <li>quis nostrud exercitation</li>
                    </ContentListWrapper>,
                    titleIcon: 'camera_enhance',
                }, {
                    title: 'Morbi non turpis bibendum ipsum cursus finibus',
                    children: <ContentListWrapper className="content-list">
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>consectetur adipiscing elit</li>
                        <li>sed do eiusmod tempor incididunt ut labore</li>
                        <li>et dolore magna aliqua ut enim ad minim veniam</li>
                        <li>quis nostrud exercitation</li>
                    </ContentListWrapper>,
                    titleIcon: 'build_circle',
                }, {
                    title: 'Integer id eros vel dolor lobortis condimentum',
                    children: <ContentListWrapper className="content-list">
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>consectetur adipiscing elit</li>
                        <li>sed do eiusmod tempor incididunt ut labore</li>
                        <li>et dolore magna aliqua ut enim ad minim veniam</li>
                        <li>quis nostrud exercitation</li>
                    </ContentListWrapper>,
                    titleIcon: 'lightbulb',
                }];
            break;
            default:
        }

        return accordionData;
    }
    
    return <div className="component-accordion">
        <h1>Accordion</h1>
        
        <div className="columnised">
            <div className="col-50">
                <h4>Basic Accordion</h4>
                <Accordion 
                    listData={getAccordionHandler('basic')} 
                />
                <br />
                <br />
                
                <h4>Basic Accordion with icons</h4>
                <Accordion 
                    listData={getAccordionHandler('with-icons')} 
                />
                <br />
                <br />
                <h4>Accordion with first item open</h4>
                <Accordion 
                    listData={getAccordionHandler('with-icons')} 
                    firstItemOpen={true}
                />
                <br />
                <br />
                <h4>Accordion with allow multiple items open</h4>
                <p>Click to trigger open items</p>
                <Accordion 
                    listData={getAccordionHandler('with-icons')} 
                    firstItemOpen={true}
                    allowMultipleOpen={true}
                />
                <br />
                <br />
            </div>
            <div className="col-50">
                <h4>Accordion with maximum content height</h4>
                <Accordion 
                    listData={getAccordionHandler('with-icons')} 
                    maxContentHeight={200}
                    firstItemOpen={true}
                />
                <br />
                <br />

                <h4>Accordion without default content padding</h4>
                <p>Useful for content that requires specific padding gaps</p>
                <Accordion 
                    listData={getAccordionHandler('no-padded-content')} 
                    maxContentHeight={200}
                    firstItemOpen={true}
                    contentNoPadded={true}
                />
                
                <br />
                <br />
            </div>
        </div> 
    </div>;
}

export default withMeiosis(ComponentAccordion);


// NOTE: 
// this style is just to style mock content for demonstration purposes,
// hence not using any themeColor
const ContentListWrapper = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    
    & > li {
        display: block;
        padding: ${gaps.Small} ${gaps.Common};
        border-bottom: ${elementSizes.Border1Pixel('#eee')};

        &:last-child {
            border-bottom: 0;
        }

        &:nth-child(odd) {
            background-color: #f5f5f5;
        }
    }
`;