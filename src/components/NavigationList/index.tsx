import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { 
    elementSizes, 
    gaps, 
    animations, 
    fontSizes, 
    colorRange
} from "../../constants/layout";
import { pageList } from "../../constants/app";
import { PageObjectType, StyledColorProps, ThemeColorType } from "../../models";
import withMeiosis, { WithMeiosisProps } from "../HOC";
import { lighten } from "polished";


type NavigationListProps = {
    className?: string,
    triggerCloseSubmenu?: boolean,
}

const NavigationList: React.FC<NavigationListProps & WithMeiosisProps> = ({globalStates, className, triggerCloseSubmenu}) => {    
    const location = useLocation();
    const subListRef = useRef<HTMLUListElement>(null);
    // const subListRef: React.RefObject<HTMLUListElement> = React.createRef();

    const generateListContent = (name: string, icon?: string) => {
        return <>{(!!icon 
            ? <div className="icon"><i className="material-icons">{ icon }</i></div>
            : null )} <span className="text">{ name }</span></>;
    };

    const onShowHideSubmenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const t = e.currentTarget;
        if( t.classList.contains('open') ) {
            t.classList.remove('open');
        } else {
            t.classList.add('open');
        }
    };

    const closeAllSubmenu = () => {
        const subMenuItems = subListRef.current?.getElementsByClassName('submenu-wrapper');
        if(!!subMenuItems) {
            for(let item of subMenuItems) {
                item.classList.remove('open');
            }
        }
    };

    const hasActiveSubmenu = (item: PageObjectType) => {
        if(!!item.subMenuList) {
            const matchedLink = item.subMenuList.filter(link => link.path === location.pathname);
            return (matchedLink.length > 0);
        }
        return false;
    };

    useEffect(() => {
        if(!!triggerCloseSubmenu) {
            closeAllSubmenu();
        }
    }, [triggerCloseSubmenu, location]);

    return (
        <NavigationListWrapper 
            className="menu-list" 
            themeColor={globalStates!.themeColor}
            ref={subListRef}
        >{
            pageList.map((item, index) => {
                return <li key={index}>{
                    ( !!item.path ? (
                        <NavLink 
                            to={item.path} 
                            title={item.label}
                            activeClassName="current"
                            exact
                        >{ generateListContent(item.label, item.icon) }</NavLink>
                    ) : (
                        !!item.subMenuList && item.subMenuList.length > 0 ? (
                            <NavigationSubMenuWrapper 
                                className={[
                                    "submenu-wrapper", 
                                    (!!hasActiveSubmenu(item) ? ' current' : '')
                                ].join('')}
                                themeColor={globalStates!.themeColor}
                                onClick={onShowHideSubmenu} 
                            >
                                <div className="menu-title">{ generateListContent(item.label, item.icon) }</div>
                                <ul>{
                                    item.subMenuList.map((item, index2) => {
                                        return <li key={index + '-' + index2}>{
                                            ( !!item.path ? (
                                                <NavLink 
                                                    to={item.path} 
                                                    title={item.label}
                                                    activeClassName="current"
                                                    exact
                                                >{ generateListContent(item.label, item.icon) }</NavLink>
                                            ) : null )
                                        }</li>
                                    })                
                                }</ul>
                            </NavigationSubMenuWrapper>
                        ) : null
                    ))
                }</li>
            })                
        }</NavigationListWrapper>
    );
};

export default withMeiosis(NavigationList);

const innerListStyle = (themeColor: ThemeColorType) => `
    display: flex;
    width: 100%;
    height: ${ elementSizes.MenuCloseWidth }; 
    padding: ${ gaps.XSmall };
    align-items: center;
    box-sizing: border-box;
    text-decoration: none;
    color: ${ lighten(colorRange.L2, themeColor.primaryColor) };

    & .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        margin-right: ${ gaps.XSmall };
        text-align: center;
        transition: all ${ animations.Transition };
    }

    & .text {
        font-size: ${ fontSizes.Common };
        transition: font ${ animations.Transition };
    }

    &:hover {
        background-color: ${ lighten(colorRange.L5, themeColor.grayColor!) };
    }
`;

const NavigationListWrapper = styled.ul<StyledColorProps>`
    min-height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;

    & li {
        display: block;

        & > a {
            ${ props => innerListStyle(props.themeColor) };
        }

        & > a {
            &.current {
                color: ${ props => props.themeColor.primaryColor };
                font-weight: 500;

                & .icon {
                    color: ${ props => props.themeColor.warningColor };
                }
            }
        }
    }

    .menu-close & {
        & li {
            & > a {
                & .icon {
                    width: ${ elementSizes.MenuCloseWidth }; 
                    margin-right: 0;
                }
        
                & .text {
                    font-size: 0;
                }
            }
        }
    }

    .peek & {    
        & li {
            & > a {
                & .icon {
                    width: 2rem;
                    margin-right: ${ gaps.XSmall };
                }

                & .text {
                    font-size: inherit;
                }
            }
        }
    }
`;

const NavigationSubMenuWrapper = styled.div<StyledColorProps>`    
    & .menu-title {
        ${ props => innerListStyle(props.themeColor) };
        position: relative;
        cursor: pointer;

        &:after {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            width: ${ elementSizes.SubMenuArrowWidth }; 
            height: ${ elementSizes.MenuCloseWidth }; 
            padding-right: ${ gaps.Small };
            font-family: "Material Icons";
            font-size: ${ fontSizes.XLarge };
            justify-content: center;
            align-items: center;
            opacity: 1;
            content: "expand_more";
        }
    }

    & ul {
        padding: 0;
        margin: 0;
        max-height: 0;
        overflow: hidden;
        list-style: none;    
        transition: max-height ${ animations.Transition };

        & > li {
            & > a {
                height: 2.5rem;
                padding-left: ${ gaps.Common };
            
                & .icon {
                    & .material-icons {
                        font-size: ${fontSizes.XLarge};
                    }
                }

                & .text {
                    font-size: ${fontSizes.Small};
                }
            }
        }
    }

    &.open {
        & .menu-title {
            &:after {
                content: 'expand_less';
            }
        }
        
        & > ul {
            max-height: ${ elementSizes.SubMenuExpandedMaxHeight };
        }
    }
    
    &.current {
        & .menu-title {
            color: ${ props => props.themeColor.primaryColor };
            font-weight: 500;
                
            & .icon {
                color: ${ props => props.themeColor.warningColor };
            }

            &:after {
                content: 'expand_less';
            }
        }

        & > ul {
            max-height: ${ elementSizes.SubMenuExpandedMaxHeight };
        }
    }

    .menu-close & {
        & .menu-title {
            & .icon {
                width: ${ elementSizes.MenuCloseWidth }; 
                margin-right: 0;
            }
    
            & .text {
                font-size: 0;
            }

            &:after {
                opacity: 0;
            }
        }

        &.current {
            & > ul {
                max-height: 0;
            }
        }
    }

    .peek & {
        & .menu-title {
            & .icon {
                width: 2rem;
                margin-right: ${ gaps.XSmall };
            }

            & .text {
                font-size: inherit;
            }

            &:after {
                opacity: 1;
            }
        }

        &.current {
            & > ul {
                max-height: ${ elementSizes.SubMenuExpandedMaxHeight };
            }
        }
    }
`;