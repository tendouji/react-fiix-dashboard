import React, { useState } from "react";
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
import { copyToClipboard } from "../../helpers";

type CopyClipboardProps = {
    targetId: string,
    className?: string,
}

const CopyClipboard: React.FC<CopyClipboardProps & WithMeiosisProps> = ({globalStates, targetId, className}) => {
    const [hasCopied, setHasCopied] = useState(false);
    let copierTimer: number = 0;

    const onCopyClickHandler = () => {
        copyToClipboard(targetId);
        setHasCopied(true);
        copierTimer = window.setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <CopyClipboardWrapper 
            className={[
                "copy-clipboard",
                (!!className ? ' ' + className : '')
            ].join('')}
            themeColor={globalStates!.themeColor}
        >{ !!hasCopied 
            ? <div className="copy-message">Content copied!</div>
            : <button className="copy-btn" onClick={onCopyClickHandler}>Copy</button>
        }
        </CopyClipboardWrapper>
    );
};

export default withMeiosis(CopyClipboard);


const CopyClipboardWrapper = styled.div<StyledColorProps>`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    & .copy-message {
        font-size: ${fontSizes.Small};
        color: ${props => props.themeColor.infoColor};
    }

    & .copy-btn {
        padding: 0; 
        border: 0;
        font-size: ${fontSizes.Small};
        font-family: 'Roboto', 'Arial', 'Helvetica Neue', sans-serif;
        color: ${props => props.themeColor.primaryColor};
        line-height: 1;
        cursor: pointer;
    }
`;