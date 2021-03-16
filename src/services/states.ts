// import flyd from "flyd";
import { assets } from "../constants/routes";
import { 
    GlobalActionType, 
    GlobalStateInitialType, 
    ModalType, 
    PageType, 
    RoleType, 
    SnackBarType, 
    ThemeColorType, 
    UserInfoType
} from "../models";


export const GlobalInitialState: GlobalStateInitialType = {
    curPage: '',
    isLoggedIn: true,
    isSWRegistered: false,
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
    snackBarListData: [],
    userInfo: {
        username: 'admin',
        displayName: 'Patrick Lee Jun Ming',
        email: 'patrick.lee@fiix.com',
        imagePath: assets.IMAGE + '/profiles/profile.jpg',
        createdAt: '20200809',
        roles: RoleType.Administrator,
        notification: [{
            title: 'Today',
            notificationList: [{
                type: 'friend',
                title: 'Toni Leigh has added you.',
                imagePath: assets.IMAGE + '/profiles/profile2.jpg',
                redirectPath: '/form',
                read: false,
                createdAt: '20200809',
            }, {
                type: 'message',
                title: 'Pierre Ferry messaged you.',
                imagePath: assets.IMAGE + '/profiles/profile3.jpg',
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
                imagePath: assets.IMAGE + '/profiles/profile4.jpg',
                redirectPath: '/',
                read: false,
                createdAt: '20200809',
            }, {
                type: 'friend',
                title: 'Ahmad Shah has added you.',
                imagePath: assets.IMAGE + '/profiles/profile5.jpg',
                redirectPath: '/',
                read: false,
                createdAt: '20200809',
            }, {
                type: 'message',
                title: 'Valerie Goh messaged you.',
                imagePath: assets.IMAGE + '/profiles/profile6.jpg',
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
        // let hideSnackBarTimer: number = 0;

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
            updateServiceWorkerStatus: (val: boolean) => {
                update((state: GlobalStateInitialType) => {
                    state.isSWRegistered = val;
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
            appendSnackBarToList: (data: SnackBarType) => {
                const snackBarID: string = 'sb-' + new Date().getTime();
                update((state: GlobalStateInitialType) => {
                    const curSnackBarList = state.snackBarListData!;
                    curSnackBarList.push({
                        ...data,
                        id: snackBarID,
                    });
                    state.snackBarListData = curSnackBarList;
                    return state;
                });
            },
            removeSnackBarFromList: (id: string) => {
                update((state: GlobalStateInitialType) => {
                    const curSnackBarList = state.snackBarListData!;
                    const newSnackBarList = curSnackBarList.filter((item: SnackBarType) => item.id !== id);
                    state.snackBarListData = newSnackBarList;
                    return state;
                });
            },

            /*
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