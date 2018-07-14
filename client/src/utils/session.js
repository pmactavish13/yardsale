import API from "./API";
import Storage from "./storage";

export default {

    //*************** Verify User From Storage *************************/
    verify: function () {

        const obj = Storage.getFromStorage('YardSale');

        return new Promise(function (resolve, reject) {

            if (obj && obj.token) {
                const { token } = obj;

                API.verify({
                    token: token
                })
                    .then(json => {
                        if (json.data && json.data.success) {
                            resolve({
                                token,
                                signUpError: "",
                                isVerified: true,
                                member: json.data.member
                            }
                            );
                        } else {
                            resolve({
                                token: "",
                                signUpError: "",
                                isVerified: false,
                                member: ""
                            }
                            );
                        }
                    });
            } else {
                reject({
                    token: "",
                    signUpError: "",
                    isVerified: false,
                    member: ""
                });
            }
        })
    }

    ,

    //*************** Verify User From Storage *************************/
    signIn: function (signinData) {

        return new Promise(function (resolve, reject) {
            API.signIn({
                email: signinData.email,
                password: signinData.password
            })
                .then(res => {
                    const { data } = res;
                    if (data.success) {

                        Storage.setInStorage('YardSale', { token: data.token });

                        resolve({
                            token: data.token,
                            signUpError: "",
                            isVerified: true,
                            member: data
                        }
                        );
                    } else {

                        resolve({
                            token: "",
                            signUpError: "Error: Server Error 77",
                            isVerified: false,
                            member: ""
                        })
                    }
                })
                .catch(err => {
                    console.error(err);
                    reject({
                        token: "",
                        signUpError: "signIn failure",
                        isVerified: false,
                        member: ""
                    });
                } );
        })
    }
};