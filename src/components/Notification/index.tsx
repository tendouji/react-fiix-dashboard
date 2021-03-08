import { darken } from "polished";
import React from "react";
import styled from "styled-components";
import { 
    colorRange,
    elementSizes, 
    fontSizes, 
    gaps 
} from "../../constants/layout";
import { StyledColorProps } from "../../models";
import withMeiosis, { WithMeiosisProps } from "../HOC";


type NotificationProps = {
    disableClick?: boolean,
    className?: string,
}

const Notification: React.FC<WithMeiosisProps & NotificationProps> = ({globalActions, globalStates, disableClick, className}) => {
    const userInfo = globalStates?.userInfo;

    const getNotificationCount = ():number => {
        let count = 0;
        userInfo?.notification.forEach((notification) => {
            notification.notificationList.forEach((item) => {
                if(!item.read) count++;
            });
        });
        return count;
    }

    const onShowHideNotificationHandler = () => {
        globalActions.updateLockPageScroll(!globalStates?.showNotificationPanel);
        globalActions.showHideNotificationPanel(!globalStates?.showNotificationPanel);
    };

    return (
        <NotificationWrapper 
            themeColor={globalStates!.themeColor}
            className={[
                "notification",
                (!!disableClick ? ' no-click' : ''),
                (getNotificationCount() > 0 ? ' active' : '')
            ].join('')}
            onClick={!disableClick ? onShowHideNotificationHandler : undefined}
        >
            <div className="material-icons">{ getNotificationCount() > 0 ? 'notifications' : 'notifications_none' }</div>
            { (getNotificationCount() > 0)
                ? <div className="counter">{ getNotificationCount() > 99 ? '99+' : getNotificationCount() }</div>
                : null
            }
        </NotificationWrapper>
    );
};

export default withMeiosis(Notification);


const NotificationWrapper = styled.div<StyledColorProps>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${ elementSizes.HeaderHeight };
    height: ${ elementSizes.HeaderHeight };
    cursor: default;

    & .material-icons {
        font-size: 1.8rem;
        color: #fff;
    }

    & .counter {
        position: absolute;
        top: ${ gaps.XSmall };
        left: calc(50% + 1px);
        padding: 1px 3px;
        color: #fff;
        font-size: ${ fontSizes.XSmall };
        border-radius: ${elementSizes.BorderRadius};
        background-color: ${ props => props.themeColor.dangerColor };
    }

    &.active {
        cursor: pointer;

        & .material-icons {
            color: ${ props => darken(colorRange.L1, props.themeColor.infoColor!) };
        }

        &.no-click {
            cursor: default;
        }
    }
`;