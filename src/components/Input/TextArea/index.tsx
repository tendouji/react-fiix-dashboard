import React, { useState } from "react";
import styled from "styled-components";
import { fontSizes } from "../../../constants/layout";
import withMeiosis, { WithMeiosisProps } from "../../HOC";
import { StyledColorProps } from "../../../models";


type TextAreaProps = {
    id: string,
    placeholder?: string,
    rows?: number,
    enableCounter?: boolean,
    maxLength?: number,
    className?: string,
}

const TextArea: React.FC<TextAreaProps & WithMeiosisProps> = ({
    globalStates, 
    id,
    placeholder, 
    rows, 
    enableCounter, 
    maxLength, 
    className
}) => {
    const maxCharacter = maxLength || -1;
    const [availableCharacter, setAvailableCharacter] = useState(maxCharacter);

    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(!!maxLength) {
            const curText: string = e.currentTarget.value;
            if(curText.length <= maxLength) {
                setAvailableCharacter(maxLength - curText.length);
            }
        }
    };

    return (
        <TextAreaWrapper 
            className={[
                "textarea",
                (!!className ? ' ' + className : '')
            ].join('')}
            themeColor={globalStates!.themeColor}
        >
            <textarea 
                name={id} 
                id={id} 
                rows={rows} 
                placeholder={placeholder} 
                { ...( !!maxLength ? { maxLength } : {} ) }
                onKeyUp={onKeyUpHandler}
            />
            { (!!enableCounter && !!maxLength) && 
                <div className="counter">{ availableCharacter } character{availableCharacter > 1 ? 's' : ''} left</div> }
        </TextAreaWrapper>
    );
};

export default withMeiosis(TextArea);


const TextAreaWrapper = styled.div<StyledColorProps>`
    & .counter {
        margin-top: 3px; 
        text-align: right;
        font-size: ${ fontSizes.Small }; 
        color: ${props => props.themeColor.primaryColor};
    }
`;