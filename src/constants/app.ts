import { 
    APIObjGroupType,
    GeneralObjType, 
    PageObjectType, 
    PageType 
} from "../models";
import { assets, routes } from "./routes";

export const appData: GeneralObjType = {
    title: 'FiiX',
    siteURL: 'https://fiix-dashboard.web.app/',
    firebaseServerKey: 'AAAA_cHy0r8:APA91bGyRRvDAM35Rak5ixCFruqjkSjYvTUz51Ui33ERLBR24o-C-EDmsKLjlj7Np4joxQp24EvQTEcjTMQPosRkGPRuszgNufbUtsw2ld2zp0DSq0vsQAoNHpMHmvRvGFynkQkRv6nc', // NOTE: this needs to store somewhere, but for testing purposes, let's put here first
    logoPath: assets.IMAGE + '/logo-site.png',
    profilePath: assets.IMAGE + '/profiles/profile.jpg',
};

export const apiPath: APIObjGroupType = {
    pushNotification: {
        method: 'POST',
        path: 'https://fcm.googleapis.com/fcm/send'
        // path: 'POST https://fcm.googleapis.com/v1/projects/fiix-dashboard/messages:send'
    },
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
                path: routes.COMPONENT_FORM_ELEMENT,
                icon: 'vertical_split',
            },        
            {
                type: PageType.Table,
                label: 'Table',
                path: routes.COMPONENT_TABLE,
                icon: 'table_view',
            },
            {
                type: PageType.Table,
                label: 'Miscellaneous',
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