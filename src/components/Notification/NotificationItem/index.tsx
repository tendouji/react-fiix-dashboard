import { darken, lighten } from "polished";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { 
    colorRange,
    elementSizes, 
    fontSizes, 
    gaps 
} from "../../../constants/layout";
import { NotificationType, StyledColorProps } from "../../../models";
import withMeiosis, { WithMeiosisProps } from "../../HOC";


type NotificationItemProps = {
    notificationItemData: NotificationType
}

const NotificationItem: React.FC<WithMeiosisProps & NotificationItemProps> = ({
    globalActions, 
    globalStates, 
    notificationItemData,
}) => {
    const {
        title,
        redirectPath,
        read,
        createdAt,
        imagePath,
        icon
    } = notificationItemData;
    
    const onHideNotificationHandler = () => {
        globalActions.updateLockPageScroll(false);
        globalActions.showHideNotificationPanel(false);
    };

    return (
        <NotificationItemWrapper 
            themeColor={globalStates!.themeColor}
            className={[
                "notification-item",
                (!!read ? ' read' : '')
            ].join('')}>
            <Link 
                className="notification-link" 
                to={redirectPath} 
                onClick={onHideNotificationHandler}
            >
                <div className="image-holder">
                    { !!icon && icon !== '' 
                        ? <span className="material-icons">{icon}</span>
                        : <span className="image" style={{ backgroundImage: `url(${imagePath})` }} />
                    }
                </div>
                <div className="info">
                    <div className="title">{ title }</div>
                    <div className="date">{ createdAt }</div>
                </div>
            </Link>
            <div className="more-action">
                <button>
                    <span className="material-icons">more_vert</span>
                </button>
            </div>
        </NotificationItemWrapper>
    );
};

export default withMeiosis(NotificationItem);


const NotificationItemWrapper = styled.div<StyledColorProps>`
    position: relative;
    display: flex;
    border-bottom: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
    box-sizing: border-box;
    justify-content: space-between;

    &:after {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 3px;
        background-color: ${props => props.themeColor.dangerColor!};
        content: '';
    }

    & .notification-link {
        display: flex;
        width: calc(100% - 1.5rem);
        justify-content: space-between;
        text-decoration: none;

        & .image-holder {
            display: flex;
            width: 3rem;
            padding: ${ gaps.Small };
            justify-content: space-between;
            align-items: center;
            
            & .image {
                display: block;
                width: 3rem; 
                height: 3rem; 
                background: ${ props => lighten(colorRange.L3, props.themeColor.grayColor!) } center / cover no-repeat;
                border-radius: ${elementSizes.BorderRadius};
            }
            
            & .material-icons {
                display: flex;
                width: 3rem; 
                height: 3rem; 
                font-size: 2.5rem;
                color: #fff;
                border-radius: ${elementSizes.BorderRadius};
                background-color: ${ props => lighten(colorRange.L3, props.themeColor.secondaryColor!) };
                justify-content: center;
                align-items: center;
            }
        }

        & .info {
            width: calc(100% - 3rem - 2 * ${gaps.Small});
            padding: ${ gaps.Small } 0;

            & .title {
                font-size: ${fontSizes.Common};
                font-weight: 500;
                line-height: 1.2em;
                color: ${ props => darken(colorRange.L3, props.themeColor.secondaryColor) };
            }

            & .date {
                margin-top: ${gaps.XSmall};
                font-size: ${fontSizes.Small};
                color: ${ props => lighten(colorRange.L3, props.themeColor.grayColor!) }
            }
        }
    }

    & .more-action {
        width: 1.5rem;

        & > button {
            height: 100%;
            width: 100%;
            padding: 0;
            border: 0;
            text-align: center;
            background: transparent;
            cursor: pointer;

            & .material-icons {
                font-size: ${fontSizes.Large};
            }
        }
    }

    &.read {
        &:after {
            display: none;
        }
    }
`;