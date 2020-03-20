const mongoose = require('mongoose');
let schema = mongoose.Schema;

let userSchema = new schema(
    {
        userId: {
            type: String,
            index: true,
            unique: true
        },
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        countryName: {
            type: String,
            default: ''
        },
        mobileNumber: {
            type: String,
            default: ''
        },
        password: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },

        //storing the ids of all friends
        friends: {
            type: [{
                friendId: {
                    type: String,
                    default: ''
                },
                friendName:{
                    type:String,
                    default:''
                }

            }]
        },

        //storing the ids of friends sending friend request
        friendRequestRecieved: {
            type: [{
                friendId: {
                    type: String,
                    default: ''
                }

            }]
        },

        //storing the ids of friends to whom friend request has been sent
        friendRequestSent: {
            type: [{
                friendId: {
                    type: String,
                    default: ''
                }
            }]
        },

        createdOn: {
            type: Date,
            default: ""
        }

    }
)

mongoose.model('userModel', userSchema);