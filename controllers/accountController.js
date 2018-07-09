// const Member = require('../../models/member')
// const Session = require('../../models/session')

const db = require("../models");

// Defining methods for the productsController
// module.exports = (app) => {
module.exports = {
    signIn: function (req, res) {
        // console.log("In Signin")

        const { body } = req;
        const { password } = body;
        let { email } = body;

        console.log(email)
        console.log(password)
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
            password: password
        }, (err, members) => {
            if (err) {

                console.log('Error: Server Error 130.')
                return res.send({
                    success: false,
                    message: 'Error: Server Error 130.'
                });
            } else if (members.length != 1) {
                console.log(members.length)
                return res.send({
                    success: false,
                    message: 'Member Not found'
                });
            }

            const member = members[0];
            // console.log(member)
            // if (!member.validPassword(password)) {
            //     return res.send({
            //         success: false,
            //         message: 'Error: Invalid'
            //     });
            // }

            // console.log('here: 59')
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

                console.log("Token: " + doc._id)
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                });

            })
        });
    }


    // app.post('/account/signup', (req, res, next) => {
    //     const { body } = req;
    //     const { firstName, lastName, password } = body;
    //     let { email } = body;


    //     if (!firstName) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: first name cannot be blank.'
    //         })
    //     }

    //     if (!lastName) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: last name cannot be blank.'
    //         })
    //     }

    //     if (!password) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: password cannot be blank.'
    //         })
    //     }

    //     if (!email) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: email cannot be blank.'
    //         })
    //     }

    //     email = email.toLowerCase();

    //     // steps:
    //     // 1) Verify email doesn't exist
    //     // 2) Save it
    //     Member.find({
    //         email: email
    //     }, (err, previousMembers) => {
    //         if (err) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: Server Error 66.'
    //             });
    //         } else if (previousMembers.length > 0) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: Unable to complete Signup.'
    //             });
    //         }

    //         const newMember = new Member();
    //         newMember.email = email;
    //         newMember.firstName = firstName;
    //         newMember.lastName = lastName;
    //         newMember.password = newMember.generateHash(password);
    //         newMember.save((err, member) => {
    //             if (err) {
    //                 return res.send({
    //                     success: false,
    //                     message: 'Error: Server Error 84.'
    //                 });
    //             }
    //             return res.send({
    //                 success: true,
    //                 message: 'Signed up.'
    //             });
    //         });
    //     })

    // });

    // app.get('/account/verify', (req, res, next) => {
    //     // get the token
    //     const { query } = req;
    //     const { token } = query;

    //     //verify the token
    //     Session.find({
    //         _id: token,
    //         isDeleted: false
    //     }, (err, sessions) => {
    //         if (err) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: Server error 181.'
    //             });
    //         }

    //         if (sessions.length != 1) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: Invalid.'
    //             });
    //         } else {
    //             return res.send({
    //                 success: true,
    //                 message: 'Good Session.'
    //             });
    //         }


    //     });

    // });

    // app.get('/account/logout', (req, res, next) => {
    //     // get the token
    //     const { query } = req;
    //     const { token } = query;

    //     //verify the token
    //     Session.findOneAndUpdate({
    //         _id: token,
    //         isDeleted: false
    //     }, { $set: { isDeleted: true } }, null, (err, sessions) => {
    //         if (err) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: Server error 181.'
    //             });
    //         }

    //         return res.send({
    //             success: true,
    //             message: 'Logged Out.'
    //         });

    //     });

    // });
};
