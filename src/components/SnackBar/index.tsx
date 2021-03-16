import React, { useRef } from "react";
import styled from "styled-components";
import { durations, gaps } from "../../constants/layout";
import { SnackBarType, StyledColorProps } from "../../models";
import withMeiosis, { WithMeiosisProps } from "../HOC";
import SnackBarItem from "./SnackBarItem";


type SnackBarGroupProps = {
    className?: string,
}

const SnackBarGroup: React.FC<WithMeiosisProps & SnackBarGroupProps> = ({globalActions, globalStates, className}) => {
    const snackBarListData = globalStates?.snackBarListData;
    const snackBarContainerRef = useRef<HTMLDivElement>(null);

    /*
    // NOTE: 
    // instead of using deep comparision for snackBarListData array in useEffect,
    // use simple timestamp to trigger useEffect
    const [arrayChange, setArrayChange] = useState('');
    if(!!snackBarListData && snackBarListData.length > 0) {
        const curID = (new Date()).getTime().toString();
        if(arrayChange !== curID) {
            setArrayChange(curID);
        }
    }

    useEffect(() => {
        if(!!snackBarListData) {
            const sbCount: number = snackBarListData.length;
            if(snackBarContainerRef.current) {
                snackBarContainerRef.current.style.top = `-${(sbCount - maximumSnackBarCount) * itemH}px`;
            }
        } 
    }, [arrayChange]);
    */

    return ( !!snackBarListData ? (
        <SnackBarGroupWrapper 
            themeColor={globalStates!.themeColor}
            className="snackbar-group"
            style={{height: (
                (snackBarListData.length > maximumSnackBarCount 
                    ? maximumSnackBarCount 
                    : snackBarListData.length
                ) * itemH
            ) + 'px' }}
        ><div className="snackbar-container" ref={snackBarContainerRef}>
            { snackBarListData.map((snackbar: SnackBarType, key: number) => {
                return <SnackBarItem snackBarData={snackbar} key={snackbar.id} />
            }) }
        </div></SnackBarGroupWrapper>
    ) : null );
};

export default withMeiosis(SnackBarGroup);

const itemH: number = 64 + 10; // height + margin bottom
const maximumSnackBarCount: number = 3;

const SnackBarGroupWrapper = styled.div<StyledColorProps>`
    position: fixed;
    bottom: 0;
    left: ${gaps.Common};
    width: calc(100% - 2 * ${gaps.Common});
    height: 0;
    box-sizing: border-box;
    transition: height ${durations.Transition};
    overflow: hidden;

    & .snackbar-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        // transition: top ${durations.Transition};
    }
`;