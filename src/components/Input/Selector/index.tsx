import React, { useState } from "react";
import styled from "styled-components";
import { 
    colorRange, 
    elementSizes, 
    fontSizes, 
    styleGroup,
    gaps 
} from "../../../constants/layout";
import withMeiosis, { WithMeiosisProps } from "../../HOC";
import { SelectOptionListType, StyledColorProps } from "../../../models";
import { lighten, rgba } from "polished";


type SelectorProps = {
    id: string,
    optionList?: SelectOptionListType[],
    placeholder?: string,
    selectedIndex?: number,
    className?: string,
}

const Selector: React.FC<SelectorProps & WithMeiosisProps> = ({
    globalStates, 
    id,
    optionList,
    placeholder, 
    selectedIndex,
    className
}) => {
    const [selectedOption, setSelectedOption] = useState(selectedIndex || 0);

    const newOptionList: SelectOptionListType[] = [
        {
            label: placeholder || 'Please select...',
            value: '0',
        },
        ...(!!optionList && optionList.length > 0 ? optionList : [])
    ];

    const getSelectedValue = () => {
        let curValue = newOptionList[selectedOption].value;
        return (!!curValue && curValue !== '' ? curValue : newOptionList[selectedOption].label);
    };

    const getSelectedLabel = () => newOptionList[selectedOption].label;

    const onSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedOption(e.target.selectedIndex);

    return (
        <SelectorWrapper 
            className={[
                "selector",
                (!!className ? ' ' + className : '')
            ].join('')}
            themeColor={globalStates!.themeColor}
        >
            <div className="text-display">
                <div className="selected-text">{ getSelectedLabel() }</div>
                <div className="icon">
                    <span className="material-icons">expand_more</span>
                </div>
            </div>
            
            <select 
                className="selection-list"
                name={id} 
                id={id}
                value={getSelectedValue()}
                onChange={onSelectChangeHandler}
            >
                <option value={0}>{ placeholder || 'Please select...' }</option>

                { !!optionList ? 
                    optionList.map((item: SelectOptionListType, key: number) => 
                        <option 
                            value={(!!item.value && item.value !== '' ? item.value : null) || item.label}
                            key={key}
                        >{ item.label}</option>
                    ) : null
                }
            </select>
        </SelectorWrapper>
    );
};

export default withMeiosis(Selector);


const SelectorWrapper = styled.div<StyledColorProps>`
    position: relative;
    width: 100%;
    border: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L4, props.themeColor.grayColor!)) };
    border-radius: ${elementSizes.BorderRadius};
    font-size: ${fontSizes.Common};
    background-color: #fff;

    & .text-display {
        position: relative;
        
        & .selected-text {
            width: calc(100% - 2.5rem);
            padding: ${gaps.Small} 0 ${gaps.Small} ${gaps.Small};
            line-height: ${fontSizes.Large};
            box-sizing: border-box;
            ${styleGroup.TextOverflow}
        }

        & .icon {
            display: flex;
            position: absolute;
            top: 0;
            right: 0;
            width: 2.5rem;
            height: 100%;
            font-size: ${ fontSizes.Large }; 
            color: ${props => props.themeColor.grayColor!};
            justify-content: center;
            align-items: center;
        }
    }

    & .selection-list {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
    }

    &:hover,
    &:focus {
        box-shadow: 0px 0px 0px 3px ${ props => rgba(props.themeColor.primaryColor, 0.4) };
        border: ${ props => elementSizes.Border1Pixel(rgba(props.themeColor.primaryColor, 0.4)) };
        outline: none;

        & .icon {
            color: ${props => lighten(colorRange.L2, props.themeColor.primaryColor)};
        } 
    }
`;