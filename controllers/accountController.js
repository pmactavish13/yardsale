// const Member = require('../../models/member')
// const Session = require('../../models/session')

const db = require("../models");

// Defining methods for the productsController
// module.exports = (app) => {
module.exports = {
    signIn: function (req, res) {
        const { body } = req;
        const { password } = body;
        let { email } = body;

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: password cannot be blank.'
            })
        }

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: email cannot be blank.'
            })
        }

        email = email.toLowerCase();

        db.Member.find({
            email: email,
            password: password,
            isDeleted: false
        }, (err, members) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error 130.'
                });
            } else if (members.length != 1) {
                return res.send({
                    success: false,
                    message: 'Member Not found'
                });
            }

            const member = members[0];
            //TODO: Restore password validation.
            // if (!member.validPassword(password)) {
            //     return res.send({
            //         success: false,
            //         message: 'Error: Invalid'
            //     });
            // }

            //otherwise launch a session
            const session = new db.Session();
            session.userId = member._id;
            session.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error 154.',
                        err: err
                    });
                }

                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
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

        // TODO:  Verify token is marked deleted in DB
        return res.send({
            success: true,
            message: 'Valid sign Out',
            token: ''
        });

    },
    // verify: function (req, res) {
    //     const { body } = req;
    //     const { token } = body;

    //     // TODO:  Actually Verify the user session againts the DB...

    //     db.Session.find({
    //         _id: token,
    //         isDeleted: false
    //     }, (err, sessions) => {
    //         console.log(sessions[0].userId);
    //         if (err) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: Server Error 130.'
    //             });
    //         } else if (sessions.length != 1) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Session Error'
    //             });
    //         }

    //         return res.send({
    //             success: true,
    //             message: 'User Logged in'
    //         });
    //     });
    // }
};
