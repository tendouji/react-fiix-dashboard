export type GeneralObjType = {
    [key: string]: any,
}

export type StyledColorProps = {
    readonly themeColor: ThemeColorType;
};
  
export enum PageType {
    Home = 'home',
    Dashboard = 'dashboard',
    About = 'about',
    Form = 'form',
    Table = 'table',
    Accordion = 'accordion',
    Alert = 'alert',
    Miscellaneous = 'miscellaneous',
    FAQ = 'faq',
}

export type APIObjType = {
    method: string,
    path: string,
}

export type APIObjGroupType = {
    [key: string]: APIObjType,
}

export type PageObjectType = {
    label: string,
    type?: string,
    path?: string,
    icon?: string,
    subMenuList?: PageObjectType[],
}

export enum RoleType {
    SuperAdmin = 'SuperAdmin',
    Administrator = 'Administrator',
    Editor = 'Editor',
    Viewer = 'Viewer',
}

export type ThemeColorType = {
    primaryColor: string,
    secondaryColor: string,
    grayColor?: string,
    infoColor?: string,
    successColor?: string,
    dangerColor?: string,
    warningColor?: string,
}

export type UserInfoType = {
    username: string,
    displayName: string,
    email: string,
    imagePath: string,
    createdAt: string,
    roles: RoleType,
    notification: NotificationGroupType[],
}

export type NotificationType = {
    type: string,
    title: string,
    redirectPath: string,
    read: boolean,
    createdAt: string,
    imagePath?: string,
    icon?: string,
}

export type NotificationGroupType = {
    title: string,
    notificationList: NotificationType[],
}

export type ModalType = {
    title: string,
    content: string,    
    isShown: boolean,
    size?: string,    
    positiveButtonText?: String,
    negativeButtonText?: String,
    positiveButtonAction?: () => void,
    negativeButtonAction?: () => void,
    showNegativeButton?: boolean,
    allowOverlayClose?: boolean,
}

export type SnackBarType = {
    isShown: boolean,
    message: string,
    id?: string,
    hasAction?: boolean,
    actionButtonLabel?: string,
    actionClickHandler?: () => void,
    closeHandler?: () => void,
}

export type AccordionListType = {
    title: string,
    children: React.ReactNode,
    titleIcon?: string,
    maxContentHeight?: number,
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export type TableDataType = {
    headerData?: (string | number)[],
    rowData: any[],
    title?: string,
    highlightAltRow?: boolean,
    cellNoWrap?: boolean,
    columnRelayoutResponsive?: boolean,
}

export type SelectOptionListType = {
    label: string,
    value?: string,
    isSelected?: boolean,
}

export type GlobalStateInitialType = {
    curPage: string,
    isLoggedIn: boolean,
    isSWRegistered: boolean,
    lockPageScroll: boolean,
    showNotificationPanel: boolean,
    themeColor: ThemeColorType,
    modalData?: ModalType,
    userInfo?: UserInfoType,
    snackBarListData?: SnackBarType[],
    // shareInfo: ShareInfoType,
}

export type GlobalActionType = {
    updateCurPage: (val: PageType) => void,
    updateLoggedSession: (val: boolean) => void,
    updateServiceWorkerStatus: (val: boolean) => void,
    updateThemeColor: (data: ThemeColorType) => void,
    updateUserInfo: (data: UserInfoType) => void,
    openModal: (info: ModalType) => void,
    closeModal: () => void,
    showHideNotificationPanel: (data: boolean) => void,
    updateLockPageScroll: (data: boolean) => void,
    appendSnackBarToList: (info: SnackBarType) => void,
    removeSnackBarFromList: (id: string) => void,
    // updateUserInfoByKey: (key: string, info: any) => void,
    // updateShareInfo: (info: ShareInfoType) => void,
}