class FirebaseDB {
    firebaseDB:any = null;
    deviceFCM:any = null;

    constructor(firebaseDB: any) {
        this.firebaseDB = firebaseDB;
        this.deviceFCM = this.firebaseDB.child('device-fcm');
    }

    getSnapshot() {
        return this.deviceFCM.get()
            .then(function(snapshot: any) {
                if(snapshot.exists()) {
                    return { data: snapshot.val() }
                } else {
                    return { data: {} };
                }
            }).catch(function(error: any) {
                return { 
                    error: true,
                    data: error
                };
            });
    }

    checkTokenExist(token: string) {
        let curFCMSnapshot = null;
        return this.deviceFCM.get() // implement getSnapshot here
            .then(function(snapshot: any) {
                if(snapshot.exists()) {
                    curFCMSnapshot = snapshot.val();

                    for(let record in curFCMSnapshot) {
                        if(curFCMSnapshot[record].token === token) {
                            return {
                                existed: true,
                                data: {
                                    key: record,
                                    value: curFCMSnapshot[record]
                                }
                            }
                        } 
                    }

                    return { existed: false };
                } else {
                    return { existed: false };
                }
            }).catch(function(error: any) {
                return { 
                    error: true,
                    data: error
                };
            });
    }

    addToken(user: string, token: string) {
        // console.log('addToken', user, token);
        return this.deviceFCM
            .push()
            .set({token, user})
            .then(() => {
                return { success: true };
            })
            .catch((error: any) => {
                return { 
                    error: true,
                    data: error
                };
            });
    }

    updateToken(key: string, user: string, token: string) {
        // console.log('updateToken', key, user, token);
        return this.deviceFCM.child(key)
        .update({user, token})
        .then(() => {
            return { success: true };
        })
        .catch((error: any) => {
            return { 
                error: true,
                data: error
            };
        });
    }

    addOrUpdateToken(user: string, token: string) {
        this.checkTokenExist(token)
        .then((response: any) => {
            if(!response.error) {
                if(!!response.existed) {
                    this.updateToken(response.data.key, user, token);
                } else {
                    this.addToken(user, token);
                }
            };
        });
    }
}

export default FirebaseDB;
