import React, { MutableRefObject, useEffect, useState } from "react";
import styled from "styled-components";
import { 
    colorRange,
    durations, 
    elementSizes, 
    fontSizes, 
    gaps 
} from "../../../constants/layout";
import { SnackBarType, StyledColorProps } from "../../../models";
import withMeiosis, { WithMeiosisProps } from "../../HOC";
import { lighten } from "polished";
import Button from "../../Button";
import { nextTick } from "process";
import { getDurationsNumber } from "../../../helpers";


type SnackBarProps = {
    snackBarData: SnackBarType,
    className?: string,
};

const snackBarDurationPerSegment = getDurationsNumber(durations.SnackBarLifeSpan) / 10;


const SnackBar: React.FC<WithMeiosisProps & SnackBarProps> = ({globalActions, globalStates, snackBarData, className}) => {
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [loaderBarPercentage, setLoaderBarPercentage] = useState(0);
    const [isClosed, setIsClosed] = useState(false);
    
    const requestRef: MutableRefObject<number> = React.useRef(0);
    const previousTimeRef: MutableRefObject<number> = React.useRef(0);
    
    let tempPercentage: number = 0;
        
    const startAnimation = (time: number) => {
        const deltaTime = time - previousTimeRef.current!;

        if(deltaTime >= snackBarDurationPerSegment) {
            tempPercentage += 10;
            previousTimeRef.current = time;
            setLoaderBarPercentage(tempPercentage);
        }
    
        if(tempPercentage >= 110) { // Once reach tempPercentage 100, animation needs another 1 second to complete the final 100
            setIsClosed(true);
        }

        if(!isClosed) {
            requestRef.current = requestAnimationFrame(startAnimation);
        } else {
            cancelAnimation();
        }
    }

    const cancelAnimation = () => {
        globalActions.removeSnackBarFromList(snackBarData.id);
    }
        
    useEffect(() => {
        if(!!showSnackBar) {
            requestRef.current = requestAnimationFrame(startAnimation);
            return () => cancelAnimationFrame(requestRef.current);
        }
    }, [showSnackBar, isClosed]);

    
    const onCloseHandler = () => {
        setIsClosed(true);
    };

    const onActionClickHandler = () => {
        if(!!snackBarData && !!snackBarData.actionClickHandler && typeof snackBarData.actionClickHandler === 'function' ) {
            setIsClosed(true);
            snackBarData.actionClickHandler();
        }
    };

    nextTick(() => setShowSnackBar(true));

    return <SnackBarWrapper 
        themeColor={globalStates!.themeColor}
        className="snackbar">
        <div className="text"><span dangerouslySetInnerHTML={{__html: snackBarData.message}} /></div>
        { !!snackBarData.hasAction && (
            <Button className="ghost action-button" onClick={onActionClickHandler}>
                {snackBarData.actionButtonLabel}
            </Button>
        )}
        <Button className="ghost close-button" onClick={onCloseHandler}>Close <span className="material-icons">close</span></Button>
        <div className="loader-bar" style={{ width: `${loaderBarPercentage}%` }} />
    </SnackBarWrapper>;
};

export default withMeiosis(SnackBar);


const SnackBarWrapper = styled.div<StyledColorProps>`
    display: flex;
    position: relative;
    height: ${elementSizes.SnackBarHeight};
    padding: 0 ${gaps.Common};
    margin-bottom: ${gaps.Small};
    box-sizing: border-box;
    border-radius: ${elementSizes.BorderRadius};
    background-color: ${ props => props.themeColor.secondaryColor };
    color: #fff;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    transition: bottom linear ${durations.Transition};
    
    & .text { 
        max-height: calc(2rem * 1.2);
        line-height: 1.2;
        font-size: ${fontSizes.Common};
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    & .btn {
        margin-left: ${gaps.Small};
        background-color: #fff;
    }

    & .loader-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 5px;
        width: 100%;
        background-color: ${ props => lighten(colorRange.L3, props.themeColor.secondaryColor) };
        transition: width ${snackBarDurationPerSegment}ms linear;
        content: '';
    }
        
    &.show { }

    @media screen and (max-width: ${elementSizes.MediaScreenSmallWidth}) {
        & .btn {
            margin-left: ${gaps.XSmall};
        }
    }
`;