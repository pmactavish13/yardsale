// const Member = require('../../models/member')
// const Session = require('../../models/session')

const db = require("../models");

// Defining methods for the productsController
// module.exports = (app) => {
module.exports = {
    signIn: function (req, res) {
        // console.log("accountController: Sign in")
        const { body } = req;
        // const { password } = body;
        let { email } = body;

        console.log(email);

        // if (!password) {
        //     return res.send({
        //         success: false,
        //         message: 'Error: password cannot be blank.'
        //     })
        // }

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: email cannot be blank.'
            })
        }

        // email = email.toLowerCase();

        db.Member.find({
            email: email,
            // password: password,
            isDeleted: false
        }, { password: 0 }, (err, members) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error 38.'
                });
            } else if (members.length != 1) {
                return res.send({
                    success: false,
                    message: 'Member Not found'
                });
            }

            const member = members[0];

            // console.log("Start session");
            const session = new db.Session();
            session.userId = member._id;
            session.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error 63.',
                        err: err
                    });
                }

                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id,
                    memberId: session.userId
                });

            })
        });
    },

    signOut: function (req, res) {
        const { body } = req;
        const { token } = body;

        if (!token) {
            return res.send({
                success: false,
                message: 'Error: Token cannot be blank.'
            })
        };
        // TODO: Revisit setting state to deleted
        db.Session.remove({
            _id: token,
            isDeleted: false
        }, (err) => {
            if (!err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error 96',
                    err: err
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Valid sign Out',
                    token: ''
                });
            }
        });
    },

    verify: function (req, res) {
        const { body } = req;
        const { token } = body;

        db.Session.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {

            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error 120.'
                });
            } else if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Member Not found'
                });
            }

            session = sessions[0];
            
            //TODO: Pass through controller, not model?
            db.Member.find({
                _id: session.userId,
                isDeleted: false
            }, { password: 0 }, (err, members) => {

                member = members[0];

                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error 38.'
                    });
                } else if (members.length != 1) {
                    return res.send({
                        success: false,
                        message: 'Member Not found'
                    });
                } else {
                    return res.send({
                        success: true,
                        message: 'User Logged in',
                        token: session._id,
                        member
                    });
                }

            });

        });

    }

};
