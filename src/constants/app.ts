import { 
    GeneralObjType, 
    PageObjectType, 
    PageType 
} from "../models";
import { routes } from "./routes";

export const appData: GeneralObjType = {
    title: 'FiiX',
    logoPath: '/logo-site.png',
    profilePath: '/profile.jpg',
};

export const pageList: PageObjectType[] = [
    {
        type: PageType.Home,
        label: 'Home',
        path: routes.HOME,
        icon: 'home',
    },
    {
        type: PageType.Dashboard,
        label: 'Dashboard',
        path: routes.DASHBOARD,
        icon: 'dashboard',
    },
    {
        type: PageType.About,
        label: 'About Us',
        path: routes.ABOUT_US,
        icon: 'help_center',
    },
    {
        label: 'Components',
        icon: 'dashboard_customize',
        subMenuList: [
            {
                type: PageType.Accordion,
                label: 'Accordion',
                path: routes.COMPONENT_ACCORDION,
                icon: 'list_alt',
            },        
            {
                type: PageType.Alert,
                label: 'Alerts',
                path: routes.COMPONENT_ALERT,
                icon: 'announcement',
            },        
            {
                type: PageType.Form,
                label: 'Form Elements',
                path: '/components/form',
                icon: 'vertical_split',
            },        
            {
                type: PageType.Table,
                label: 'Table',
                path: routes.COMPONENT_TABLE,
                icon: 'table_view',
            },
        ]
    },
    {
        type: PageType.FAQ,
        label: 'FAQ',
        path: routes.FAQ,
        icon: 'dns',
    },
];