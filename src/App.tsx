import React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import { 
    BrowserRouter as Router, 
    Switch,
    Route,
    withRouter,
} from 'react-router-dom';
import { lighten } from 'polished';
import styled from 'styled-components';
import { 
    gaps, 
    elementSizes, 
    animations, 
    colorRange,
    fontSizes
} from './constants/layout';
import { routes } from './constants/routes';
import Login from './pages/Auth/Login';
import ComponentAccordion from './pages/Components/Accordion';
import ComponentAlert from './pages/Components/Alert';
import ComponentTable from './pages/Components/Table';
import Dashboard from './pages/Dashboard';
import withMeiosis, { WithMeiosisProps } from './components/HOC';
import Header from './components/Header';
import Modal from './components/Modal';
import SideMenu from './components/SideMenu';
import NotificationPanelList from './components/Notification/PanelList';
import { StyledColorProps } from './models';


interface AppProps extends WithMeiosisProps {
    [key: string]: any
}

interface AppState extends WithMeiosisProps {
    [key: string]: any
}

class App extends React.Component<AppProps, AppState> {
    dashboardRef: React.RefObject<HTMLDivElement> = React.createRef();
    resizeTimer: number = 0;
    resizeDoneEvent: CustomEvent<string> = new CustomEvent('resizeEnd', { detail: 'resizeEnded' });

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResizeHandler);
    }

    onWindowResizeHandler = () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = window.setTimeout(() => {
            window.dispatchEvent(this.resizeDoneEvent);
        }, 250);
    };

    showHideSideMenuEvent = (isHidden: boolean): CustomEvent<{isHidden: boolean}> => new CustomEvent('showHideSideMenu', { 
        detail: { isHidden } 
    });

    onShowHideMenuHandler = () => {
        const dashboardDom = this.dashboardRef.current;
        if(dashboardDom) {
            if(dashboardDom.classList.contains('menu-close')) {
                dashboardDom.classList.remove('menu-close');
                window.dispatchEvent(this.showHideSideMenuEvent(false));
            } else {
                dashboardDom.classList.add('menu-close');
                window.dispatchEvent(this.showHideSideMenuEvent(true));
            }
        }
    };

    onHoverShowMenuHandler = (show: boolean) => {
        const dashboardDom = this.dashboardRef.current;
        if(dashboardDom) {
            if(dashboardDom.classList.contains('menu-close')) {
                if(show) dashboardDom.classList.add('peek');
                else dashboardDom.classList.remove('peek');
            }
        }
    };

    render() {
        const { globalStates } = this.props;

        return (
            <Router>
                <DashboardScreen>
                    <DashboardWrapper 
                        className={[
                            "fiix-dashboard",
                            (!globalStates?.isLoggedIn ? ' no-menu' : '')
                        ].join('')}
                        ref={this.dashboardRef}
                        themeColor={globalStates!.themeColor}
                    >
                        { !!globalStates?.isLoggedIn ? <>
                            <Header />

                            <div className="content">
                                <Switch>
                                    <Route exact path={routes.HOME} component={Dashboard} />
                                    <Route path={'/:pageId'} component={RoutingComponent} />
                                </Switch>
                            </div>
        
                            <SideMenu 
                                className="closed" 
                                onShowHide={this.onShowHideMenuHandler}
                                onHoverShow={this.onHoverShowMenuHandler}
                            />
                        </> : (
                            <Switch>
                                <Route exact path={routes.HOME} component={Dashboard} />
                                <Route path={'/:pageId'} component={RoutingComponent} />
                            </Switch>
                        )}
                        <Modal />
                        <NotificationPanelList />
                    </DashboardWrapper>
                </DashboardScreen>
            </Router>
        );
    }
}


class DashboardScreenBase extends React.Component<RouteComponentProps<any, StaticContext, any>> {
    render() {
        return <>{this.props.children}</>;
    }
}
const DashboardScreen = withRouter(DashboardScreenBase);


const RoutingComponent: React.FC<{match: any}> = ({match}) => (<>
    <Switch>
        <Route path={routes.SIGNIN} component={Login} />
        {/* 
        <Route path={routes.SIGNIN + '/:id'} component={Login} />
        <Route path={routes.SIGNUP} component={Register} />
        <Route path={routes.SIGNUP + '/:id'} component={Register} /> 
        */}
        <Route path={routes.DASHBOARD} component={Dashboard} />
        <Route path={routes.COMPONENT_ACCORDION} component={ComponentAccordion} />
        <Route path={routes.COMPONENT_ALERT} component={ComponentAlert} />
        <Route path={routes.COMPONENT_TABLE} component={ComponentTable} />
        {/* <Route path="*" render={(props: any) => <Share routeParams={{
            linkId: match.params.linkId
        }} {...props} />} /> */}
    </Switch>
</>);


export default withMeiosis(App);


const DashboardWrapper = styled.div<StyledColorProps>`
    height: 100%;
    padding-left: ${ elementSizes.MenuWidth };
    transition: padding-left ${ animations.Transition };

    &.no-menu {
        padding-left: 0;
    }

    &.menu-close {
        padding-left: ${ elementSizes.MenuCloseWidth };
    }

    & .content {
        padding: ${gaps.Common} ${gaps.Large}; 
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
        color: ${ props => props.themeColor.primaryColor };
        margin-bottom: 0.75em;
    }

    p {
        margin-top: 0;
    }

    a {
        color: ${ props => lighten(colorRange.L2, props.themeColor.primaryColor) };
    }

    button {
        &:focus {
            outline: 0;
        }
    }

    & .highlighted {
        font-weight: 500;
    }

    & .sub-text {
        font-size: ${fontSizes.Common};
    }

    & .columnised {
        display: flex;
        width: 100%;
        justify-content: space-between;

        & .col-50 {
            width: calc(50% - ${gaps.Common} / 2);
        }

        @media screen and (max-width: ${elementSizes.MediaScreenMediumWidth}) {
            display: block;
    
            & .col-50 {
                width: 100%;
            }
        }
    }
`;