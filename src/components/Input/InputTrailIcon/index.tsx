import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { colorRange, fontSizes } from "../../../constants/layout";
import withMeiosis, { WithMeiosisProps } from "../../HOC";
import { StyledColorProps } from "../../../models";


type TextAreaProps = {
    id: string,
    placeholder?: string,
    hasTrailIcon?: boolean,
    icon?: string,
    maxLength?: number,
    className?: string,
}

const InputTrailIcon: React.FC<TextAreaProps & WithMeiosisProps> = ({
    globalStates, 
    id,
    placeholder, 
    hasTrailIcon, 
    icon,
    maxLength, 
    className
}) => {
    return (
        <InputTrailIconWrapper 
            className={[
                "text-input-icon",
                (!!hasTrailIcon ? ' has-icon' : ''), 
                (!!className ? ' ' + className : '')
            ].join('')}
            themeColor={globalStates!.themeColor}
        >
            <input 
                type="text" 
                name={id} 
                id={id} 
                placeholder={placeholder} 
                { ...( !!maxLength ? { maxLength } : {} ) }
            />
            { (!!hasTrailIcon && !!icon && icon !== '') && 
                <div className="icon"><div className="material-icons"> { icon }</div></div> }
        </InputTrailIconWrapper>
    );
};

export default withMeiosis(InputTrailIcon);


const InputTrailIconWrapper = styled.div<StyledColorProps>`
    &.has-icon {
        position: relative;

        & input[type="text"] {
            padding-right: 2.5rem;

            &:focus,
            &:hover {
                & + .icon {
                    color: ${props => lighten(colorRange.L2, props.themeColor.primaryColor)};
                }    
            }
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
`;