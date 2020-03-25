
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HistorySchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    historyId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    message: {
        type: String,
        default: ''
    },

    listId: {
        type: String,
        default: '',
    },

    itemId: {
        type: String,
        default: '',
    },

    subItemId: {
        type: String,
        default: '',
    },

    category: {
        type: String,
        default: '',
    },

    oldData: [],
    newData:[],

    createdOn: {
        type: Date,
        default: Date.now()
    },

})


mongoose.model('histories', HistorySchema);