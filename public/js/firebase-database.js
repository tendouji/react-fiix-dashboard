class FirebaseDB {
    firebaseDB = null;
    deviceFCM = null;

    constructor(firebaseDB) {
        this.firebaseDB = firebaseDB;
        this.deviceFCM = this.firebaseDB.child('device-fcm');
    }

    getSnapshot() {
        return this.deviceFCM.get()
            .then(function(snapshot) {
                if(snapshot.exists()) {
                    return { data: snapshot.val() }
                } else {
                    return { data: {} };
                }
            }).catch(function(error) {
                return { 
                    error: true,
                    data: error
                };
            });
    }

    checkTokenExist(token) {
        let curFCMSnapshot = null;
        return this.deviceFCM.get() // implement getSnapshot here
            .then(function(snapshot) {
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
            }).catch(function(error) {
                return { 
                    error: true,
                    data: error
                };
            });
    }

    addToken(user, token) {
        // console.log('addToken', user, token);
        return this.deviceFCM
            .push()
            .set({token, user})
            .then(() => {
                return { success: true };
            })
            .catch((error) => {
                return { 
                    error: true,
                    data: error
                };
            });
    }

    updateToken(key, user, token) {
        // console.log('updateToken', key, user, token);
        return this.deviceFCM.child(key)
        .update({user, token})
        .then(() => {
            return { success: true };
        })
        .catch((error) => {
            return { 
                error: true,
                data: error
            };
        });
    }

    addOrUpdateToken(user, token) {
        this.checkTokenExist(token)
        .then(response => {
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
