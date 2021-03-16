import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { darken, lighten, rgba } from "polished";
import { 
    colorRange,
    elementSizes, 
    gaps, 
    durations, 
    fontSizes,
} from "../../constants/layout";
import NavigationList from "../NavigationList";
import ProfileWidget from "./ProfileWidget";
import { appData } from "../../constants/app";
import Footer from "../Footer";
import withMeiosis, { WithMeiosisProps } from "../HOC";
import { StyledColorProps } from "../../models";


type SideMenuProps = {
    onShowHide: () => void,
    onHoverShow: (show: boolean) => void,
    className?: string,
}

const SideMenu: React.FC<SideMenuProps & WithMeiosisProps> = ({globalStates, onShowHide, onHoverShow, className}) => {
    const [closeSubMenu, setCloseSubMenuStatus] = useState(false);

    useEffect(() => {
        if(!!closeSubMenu) {
            setCloseSubMenuStatus(false);
        }
    }, [closeSubMenu]);

    return (
        <SideMenuWrapper className="side-menu" themeColor={globalStates!.themeColor}>
            <div className="body"
                onMouseEnter={() => onHoverShow(true)}
                onMouseLeave={() => {
                    onHoverShow(false);
                    setCloseSubMenuStatus(true);
                }}
            >
                <div className="site-title">
                    <div className="logo" style={{ backgroundImage: `url(${appData.logoPath})` }} />
                    <div className="title">{ appData.title }</div>
                </div>
                <ProfileWidget />
                <div className="menu-content">
                    <NavigationList triggerCloseSubmenu={closeSubMenu} />
                </div>

                <Footer />
            </div>
            <div className="clicker" onClick={onShowHide}>
                <span className="material-icons right">chevron_right</span>
                <span className="material-icons left">chevron_left</span>
            </div>
        </SideMenuWrapper>
    );
};

export default withMeiosis(SideMenu);


const SideMenuWrapper = styled.div<StyledColorProps>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: ${ elementSizes.MenuWidth } ; 
    padding: 0 ${ gaps.Common } 0 0;
    transition: width ${ durations.Transition };

    & .body {
        height: 100%;
        background-color: #fff;
    }

    & .site-title {
        display: flex;
        width: 100%; 
        height: ${ elementSizes.SiteTitleHeight }; 
        background-color: ${ props => lighten(colorRange.L1, props.themeColor.primaryColor) };
        color: #fff;
        align-items: center;

        & .logo {
            width: ${ elementSizes.SiteTitleHeight };
            height: ${ elementSizes.SiteTitleHeight }; 
            background: ${ props => props.themeColor.primaryColor } center / 70% auto no-repeat ;
            margin-right: ${ gaps.Common };
            transition: margin-right ${ durations.Transition };
        }
        
        & .title {
            font-weight: 700;
            font-size: ${ fontSizes.XLarge };
            transition: all ${ durations.Transition };
        }
    }

    & .menu-content {
        width: 100%; 
        height: calc(100% - ${ elementSizes.SiteTitleHeight } - ${ elementSizes.ProfileWidgetHeight } - ${ elementSizes.FooterHeight });
        overflow-y: auto;
        transition: height ${ durations.Transition };
    }

    & .clicker {
        display: flex;
        visibility: hidden;
        position: absolute;
        top: 0;
        right: 0;
        width: ${ gaps.Common };
        height: 100%;
        cursor: pointer;
        overflow: hidden;
        justify-content: center;
        align-items: center;

        & .material-icons {
            color: ${ props => darken(colorRange.L2, props.themeColor.primaryColor) };

            &.right {
                display: none;
            }
        }
    }

    &:hover {
        & .clicker {
            background-color: ${ rgba('#fff', 0.5) };
            visibility: visible;
        }
    }

    .menu-close & {
        width: ${ elementSizes.MenuCloseWidth }; 
        
        & .site-title {
            & .logo {
                margin-right: 0;
            }

            & .title {
                width: 0;
                font-size: 0;
            }
        }

        & .menu-content {
            height: calc(100% - ${ elementSizes.SiteTitleHeight } - ${ elementSizes.MenuCloseWidth } - ${ elementSizes.FooterHeight });
        }
    
        & .clicker {
            & .material-icons {
                &.left {
                    display: none;
                }

                &.right {
                    display: inline;
                }
            }
        }
    }

    .peek & {
        width: ${ elementSizes.MenuWidth }; 

        & .site-title {
            & .logo {
                margin-right: ${ gaps.Common };
            }
            
            & .title {
                font-size: ${ fontSizes.XLarge };
            }
        }

        & .menu-content {
            height: calc(100% - ${ elementSizes.SiteTitleHeight } - ${ elementSizes.ProfileWidgetHeight } - ${ elementSizes.FooterHeight });
        }
    }

    @media screen and (max-width: ${elementSizes.MediaScreenMediumWidth}) {
        width: ${ elementSizes.MenuCloseWidth }; 
        
        & .site-title {
            & .logo {
                margin-right: 0;
            }

            & .title {
                width: 0;
                font-size: 0;
            }
        }

        & .menu-content {
            height: calc(100% - ${ elementSizes.SiteTitleHeight } - ${ elementSizes.MenuCloseWidth } - ${ elementSizes.FooterHeight });
        }
    
        & .clicker {
            display: none;
        }
    }
`;
