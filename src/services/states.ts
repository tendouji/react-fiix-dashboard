// import flyd from "flyd";
import { 
    GlobalActionType, 
    GlobalStateInitialType, 
    ModalType, 
    PageType, 
    RoleType, 
    ThemeColorType, 
    UserInfoType
} from "../models";


export const GlobalInitialState: GlobalStateInitialType = {
    curPage: '',
    isLoggedIn: true,
    showNotificationPanel: false,
    lockPageScroll: false,
    themeColor: {
        primaryColor: '#136C5D',
        secondaryColor: '#999591',
        grayColor: '#323232',
        infoColor: '#2A99D6',
        successColor: '#00DB10',
        dangerColor: '#FF5E00',
        warningColor: '#F5A41E',
    },
    modalData: {
        title: 'Message',
        content: 'Modal Content',    
        size: '',
        positiveButtonText: 'OK',
        negativeButtonText: 'Cancel',
        positiveButtonAction: () => console.log('OK'),
        negativeButtonAction: () => console.log('Cancel'),
        isShown: false,
        showNegativeButton: false,
        allowOverlayClose: false,
    },
    userInfo: {
        username: 'admin',
        displayName: 'Patrick Lee Jun Ming',
        email: 'patrick.lee@fiix.com',
        imagePath: '/profile.jpg',
        createdAt: '20200809',
        roles: RoleType.Administrator,
        notification: [{
            title: 'Today',
            notificationList: [{
                type: 'friend',
                title: 'Toni Leigh has added you.',
                imagePath: '/profile2.jpg',
                redirectPath: '/form',
                read: false,
                createdAt: '20200809',
            }, {
                type: 'message',
                title: 'Pierre Ferry messaged you.',
                imagePath: '/profile3.jpg',
                redirectPath: '/components/alerts',
                read: false,
                createdAt: '20200809',
            }, {
                type: 'calendar',
                title: 'NWEB-172 issue will be due tomorrow.',
                icon: 'date_range',
                redirectPath: '/faq',
                read: true,
                createdAt: '20200809',
            }],
        }, {
            title: 'Others',
            notificationList: [{
                type: 'message',
                title: 'Chin Ming messaged you.',
                imagePath: '/profile4.jpg',
                redirectPath: '/',
                read: false,
                createdAt: '20200809',
            }, {
                type: 'friend',
                title: 'Ahmad Shah has added you.',
                imagePath: '/profile5.jpg',
                redirectPath: '/',
                read: false,
                createdAt: '20200809',
            }, {
                type: 'message',
                title: 'Valerie Goh messaged you.',
                imagePath: '/profile6.jpg',
                redirectPath: '/',
                read: false,
                createdAt: '20200809',
            }, {
                type: 'calendar',
                title: 'NWEB-168 issue will be due tomorrow.',
                icon: 'date_range',
                redirectPath: '/',
                read: true,
                createdAt: '20200809',
            }],
        }],
    },
};

const globalState: any = {
    GlobalInitialState,
    Actions: (update: flyd.Stream<unknown>): GlobalActionType => {
        return {
            updateThemeColor: (data: ThemeColorType) => {
                update((state: GlobalStateInitialType) => {
                    const newThemeColor: ThemeColorType = {
                        ...state.themeColor,
                        ...data,
                    };
                    state.themeColor = newThemeColor;
                    return state;
                });
            },
            updateLoggedSession: (val: boolean) => {
                update((state: GlobalStateInitialType) => {
                    state.isLoggedIn = val;
                    return state;
                });
            },
            updateCurPage: (val: PageType) => {
                update((state: GlobalStateInitialType) => {
                    state.curPage = val;
                    return state;
                });
            },
            updateUserInfo: (info: UserInfoType) => {
                update((state: GlobalStateInitialType) => {
                    state.userInfo = info;
                    return state;
                });
            },
            openModal: (data: ModalType) => {
                update((state: GlobalStateInitialType) => {
                    state.modalData = data;
                    return state;
                });
            },
            closeModal: () => {
                update((state: GlobalStateInitialType) => {
                    const newModalData = {
                        ...state.modalData!, 
                        isShown: false,
                    };
                    state.modalData = newModalData;
                    return state;
                });
                setTimeout(() => {
                    update((state: GlobalStateInitialType) => {
                        state.modalData = GlobalInitialState.modalData;
                        return state;
                    });    
                }, 200);
            },
            showHideNotificationPanel: (data: boolean) => {
                update((state: GlobalStateInitialType) => {
                    state.showNotificationPanel = data;
                    return state;
                });
            },
            updateLockPageScroll: (data: boolean) => {
                if(!!data) {
                    document.body.classList.add('overflow-hidden');
                } else {
                    document.body.classList.remove('overflow-hidden');
                }

                update((state: GlobalStateInitialType) => {
                    state.lockPageScroll = data;
                    return state;
                });
            },

            /*
            updateSnackBar: (info: SnackBarInfoType) => {
                update((state: GlobalStateInitialType) => {
                    state.showSnackBar = info.isShown;
                    state.snackBarMessage = !!info.isShown ? info.message : '';
                    state.snackBarHasCTA = !!info.hasCTA;
                    state.snackBarCTAButtonLabel = !!info.CTAButtonLabel ? info.CTAButtonLabel : '';
                    state.snackBarCTAClickHandler = !!info.CTAClickHandler ? info.CTAClickHandler : () => null;
                    state.snackBarCloseHandler= !!info.closeHandler ? info.closeHandler : () => null;

                    return state;
                });
            },
            updateUserInfoByKey: (key: string, info: any) => {
                update((state: GlobalStateInitialType) => {
                    const newState = {
                        ...state.userInfo,
                        [key]: info,
                    };
                    state.userInfo = newState;
                    return state;
                });
            },
            updateShareInfo: (info: ShareInfoType) => {
                update((state: GlobalStateInitialType) => {
                    state.shareInfo = info;
                    return state;
                });
            }
            */
        }
    }
};

export default globalState;