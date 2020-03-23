
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let ListSchema = new Schema({
    userId:{
        type:String,
        default:''
    },
    listId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },

    listTitle: {
        type: String,
        default: ''
    },

    listCreatorId: {
        type: String,
        default: ''
    },

    listModifierId: {
        type: String,
        default: ''
    },

    listCreatedOn: {
        type: Date,
        default: ""
    },
    listModifiedOn: {
        type: Date,
        default: ""
    },

    //items
    items: {
        type: [{
            itemId: {
                type: String,
                default: '',
                index: true,
                unique: true
            },

            itemTitle: {
                type: String,
                default: ''
            },

            itemCreatorId: {
                type: String,
                default: ''
            },

            itemCreatedOn: {
                type: Date,
                default: ""
            },

            itemModifiedOn: {
                type: Date,
                default: ""
            },

            itemModifierId: {
                type: String,
                default: ''
            },

            itemDone: {
                type: Boolean,
                default: false
            }
        }]//end of array type of items
    }//end of items

})


mongoose.model('List', ListSchema);