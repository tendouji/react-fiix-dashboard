import { apiPath, appData } from "../constants/app";
import { APIObjType, GeneralObjType } from "../models";

class Notification {
    recipientList: GeneralObjType[] = [];
    notificationTitle: string = ''; 
    notificationMessage: string = '';

    constructor(notificationTitle: string, notificationMessage: string) {
        this.notificationTitle = notificationTitle;
        this.notificationMessage = notificationMessage;
    }

    sendNotification(to: string) {
        const notificationAPI: APIObjType = apiPath.pushNotification;

        const requestOptions = {
            method: notificationAPI.method,
            headers: { 
                'Authorization': 'key=' + appData.firebaseServerKey,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                // NOTE: if notification object is included, setBackgroundMessageHandler will not work 
                // notification: {
                //     title: this.notificationTitle,
                //     body: this.notificationMessage,
                //     icon: appData.logoPath,
                // },
                data: {
                    title: this.notificationTitle,
                    body: this.notificationMessage,
                    icon: appData.logoPath,
                    url: appData.siteURL,
                },
                to
            })
        };

        return fetch(notificationAPI.path, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(!!data.success) {
                    return {
                        success: true
                    }
                } else {
                    return { 
                        success: false,
                        error: data.results
                    };
                }
            }).catch(() => {
                return { 
                    success: false 
                };
            });
    }

    getRecipientList() {
        const firebaseDB = window.firebaseDB;
        return firebaseDB.getSnapshot()
        .then((response: any) => {
            if(!!response.data) {
                const respArr = Object.keys(response.data);
                if(respArr.length > 0) {
                    for(let recipient in response.data) {
                        const tempObj = {
                            id: recipient,
                            user: response.data[recipient].user,
                            token: response.data[recipient].token,
                        }
                        this.recipientList.push(tempObj);
                    }
                    return { hasData: true };
                }
                return { hasData: false };
            }
            return { hasData: false };
        }).catch(() => {
            return { hasData: false };
        })
    }

    blastNotification(count?: number) {
        this.getRecipientList()
        .then((response: {hasData: boolean}) => {
            if(!!response.hasData) {
                const counter: number = count || 0;
                this.queueNotification(counter);
            }
        })
    }

    queueNotification(count: number) {
        if(count < this.recipientList.length) {
            // const { user, token, id } = this.recipientList[count];
            const { token } = this.recipientList[count];
            this.sendNotification(token)
            .then((response) => {
                // if(!!response.success) {
                this.queueNotification(++count);
                // }
            });
        }
    }

}

export default Notification;