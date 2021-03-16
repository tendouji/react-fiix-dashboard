import { lighten } from "polished";
import React from "react";
import styled from "styled-components";
import { 
    elementSizes, 
    gaps, 
    durations, 
    fontSizes, 
    styleGroup,
    colorRange
} from "../../../constants/layout";
import { StyledColorProps, UserInfoType } from "../../../models";
import withMeiosis, { WithMeiosisProps } from "../../HOC";


type ProfileWidgetProps = {
    className?: string,
}

const ProfileWidget: React.FC<WithMeiosisProps & ProfileWidgetProps> = ({globalActions, globalStates, className}) => {
    const userInfo:UserInfoType | undefined = globalStates?.userInfo;

    return (
        <ProfileWidgetWrapper 
            className="profile-widget"
            themeColor={globalStates!.themeColor}
        >
            { !!userInfo ? 
                <div className="user-widget">
                    <div className="image" style={{ backgroundImage: `url(${userInfo.imagePath})` }} />
                    <div className="info">
                        <div className="display-name">{userInfo.displayName}</div>
                        <div className="rank">{userInfo.roles}</div>
                        <div className="email"><a href={`mailto:${userInfo.email}`}>{userInfo.email}</a></div>
                        <div className="date">{userInfo.createdAt}</div>
                    </div>
                </div>
                : null
            }
        </ProfileWidgetWrapper>
    );
};

export default withMeiosis(ProfileWidget);

const ProfileWidgetWrapper = styled.div<StyledColorProps>`
    width: 100%; 
    height: ${ elementSizes.ProfileWidgetHeight }; 
    padding: ${ gaps.Small };
    border-bottom: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
    box-sizing: border-box;
    overflow: hidden;
    transition: all ${ durations.Transition };

    & .user-widget {
        display: flex;
        justify-content: space-between;

        & .image {
            width: calc(${ elementSizes.ProfileWidgetHeight } - 2 * ${ gaps.Small }); 
            height: calc(${ elementSizes.ProfileWidgetHeight } - 2 * ${ gaps.Small }); 
            background: ${ props => lighten(colorRange.L3, props.themeColor.grayColor!) } center / cover no-repeat ;
            border-radius: ${elementSizes.BorderRadius};
            transition: all ${ durations.Transition };
        }

        & .info {
            width: calc(100% - (${ elementSizes.ProfileWidgetHeight } - ${ gaps.Small } )); 
            overflow: hidden;
            transition: width ${ durations.Transition };

            & * {
                line-height: 1.2em;
            }
            
            & .display-name {
                width: 100%;
                font-weight: 700;
                font-size: ${ fontSizes.Common };
                // display: -webkit-box;
                // -webkit-line-clamp: 2;
                // -webkit-box-orient: vertical; 
                // text-overflow: -o-ellipsis-lastline;
                ${styleGroup.TextOverflow}
                transition: font ${ durations.Transition };
            }

            & .rank {
                font-size: ${ fontSizes.Small };
                transition: font ${ durations.Transition };
            }

            & .email {
                margin-top: ${ gaps.XSmall };
                font-size: ${ fontSizes.Small };
            }

            & .date {
                font-size: ${ fontSizes.Small };

                &:before {
                    content: 'Joined since ';
                }
            }
        }
    }

    .menu-close & {
        height: ${ elementSizes.MenuCloseWidth }; 
        padding: 0;

        & .user-widget {
            & .image {
                width: ${ elementSizes.MenuCloseWidth };
                height: ${ elementSizes.MenuCloseWidth };
                border-radius: 0;
            }

            & .info {
                & .display-name {
                    font-size: 0;
                }

                & .rank {
                    font-size: 0;
                }
            }
        }
    }

    .peek & {
        height: ${ elementSizes.ProfileWidgetHeight }; 
        padding: ${ gaps.Small };

        & .user-widget {
            & .image {
                width: calc(${ elementSizes.ProfileWidgetHeight } - 2 * ${ gaps.Small }); 
                height: calc(${ elementSizes.ProfileWidgetHeight } - 2 * ${ gaps.Small }); 
            }

            & .info {
                width: calc(100% - (${ elementSizes.ProfileWidgetHeight } - ${ gaps.Small } )); 
        
                & .display-name {
                    font-size: ${ fontSizes.Common };
                }

                & .rank {
                    font-size: ${ fontSizes.Small };
                }
            }
        }
    }

    @media screen and (max-width: ${elementSizes.MediaScreenMediumWidth}) {
        height: ${ elementSizes.MenuCloseWidth }; 
        padding: 0;

        & .user-widget {
            & .image {
                width: ${ elementSizes.MenuCloseWidth };
                height: ${ elementSizes.MenuCloseWidth };
                border-radius: 0;
            }

            & .info {
                & .display-name {
                    font-size: 0;
                }

                & .rank {
                    font-size: 0;
                }
            }
        }
    }
`;