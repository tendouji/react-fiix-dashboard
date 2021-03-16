import React from "react";
import { darken, lighten, rgba } from "polished";
import styled from "styled-components";
import { 
    durations,
    colorRange,
    elementSizes, 
    gaps 
} from "../../../constants/layout";
import { 
    NotificationGroupType, 
    NotificationType, 
    StyledColorProps 
} from "../../../models";
import withMeiosis, { WithMeiosisProps } from "../../HOC";
import NotificationItem from "../NotificationItem";
import Notification from "..";


type NotificationPanelListProps = {
    className?: string,
}

const NotificationPanelList: React.FC<WithMeiosisProps & NotificationPanelListProps> = ({globalActions, globalStates, className}) => {
    const notificationData = globalStates?.userInfo?.notification;
    const showNotificationPanel = globalStates?.showNotificationPanel;

    const onHideNotificationPanel = () => {
        globalActions.updateLockPageScroll(false);
        globalActions.showHideNotificationPanel(false);
    };

    return ( !!notificationData ?
        <NotificationPanelListWrapper 
            themeColor={globalStates!.themeColor}
            className={[
                "notification-panel-list",
                (!!showNotificationPanel ? ' show' : '')
            ].join('')}>
            <div className="clicker" onClick={onHideNotificationPanel}>
                <span className="material-icons right">chevron_right</span>
            </div>

            <div className="content-holder">
                <div className="panel-title">
                    <div className="icon">
                        <Notification disableClick={true} />
                    </div>
                    <div className="text">Notification</div>
                </div>
                { notificationData.map((notificationGroup: NotificationGroupType, index) => (
                    <div key={`g-${index}`}>
                        <div className="group-title">{notificationGroup.title}</div>
                        { notificationGroup.notificationList.map((notificationItem: NotificationType, index2) => 
                            <NotificationItem key={`g-${index}-${index2}`} notificationItemData = {notificationItem} />
                        ) }
                    </div>
                )) }
            </div>
        </NotificationPanelListWrapper>
        : null
    );
};

export default withMeiosis(NotificationPanelList);


const NotificationPanelListWrapper = styled.div<StyledColorProps>`
    position: fixed;
    top: 0;
    right: 0;
    width: 0;
    padding-left: ${ gaps.Common };
    height: 100%;
    transition: width ${durations.Transition};
    overflow: hidden;
    
    & .clicker {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: ${ gaps.Common };
        height: 100%;
        cursor: pointer;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        
        & .material-icons {
            color: ${ props => darken(colorRange.L2, props.themeColor.primaryColor) };
            display: none;
        }
    }
    
    & .content-holder {
        width: ${elementSizes.NotificationPanelWidth};
        height: 100%;
        overflow-y: auto;
        background-color: #fff;

        & .panel-title {
            display: flex; 
            height: ${elementSizes.HeaderHeight};
            justtify-content: space-between;
            align-items: center;

            & .icon {
                width: ${elementSizes.HeaderHeight};
                height: ${elementSizes.HeaderHeight};
            }
            
            & .text {
                width: calc(100% - ${elementSizes.HeaderHeight} - ${gaps.Small});
                font-weight: 500;
            }
        }

        & .group-title {
            display: flex; 
            height: 2.5rem;
            padding: 0 ${ gaps.Small };
            border-bottom: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
            box-sizing: border-box;
            background: ${ props => lighten(colorRange.L5, props.themeColor.grayColor!) };
            align-items: center;
            font-weight: 500;
        }
    }
    
    &.show {
        width: ${elementSizes.NotificationPanelWidth};

        & .clicker {
            display: flex;
        }

        &:hover {
            background-color: ${ rgba('#fff', 0.5) };
        }
    }

    &:hover {
        & .clicker {
            & .material-icons {
                display: inline-block;
            }
        }
    }
`;