
const mongoose = require('mongoose');
Schema = mongoose.Schema;

let ListSchema = new Schema({
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

    //id of user who created list initially
    listCreatorId: {
        type: String,
        default: ''
    },

    //id of user who modified list
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
    }

})


mongoose.model('List', ListSchema);