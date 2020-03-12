
const mongoose = require('mongoose');
Schema = mongoose.Schema;

let ItemSchema = new Schema({

    //associated id of list to the item
    listId: {
        type: String,
        default: '',
    },

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
    },

    subItems: {
        type: [{

            subItemId: {
                type: String,
                default: '',
            },

            subItemTitle: {
                type: String,
                default: ''
            },

            subItemCreatorId: {
                type: String,
                default: ''
            },

            subItemCreatedOn: {
                type: Date,
                default: ""
            },
            subItemModifiedOn: {
                type: Date,
                default: ""
            },

            subItemModifierId: {
                type: String,
                default: ''
            },

            subItemDone: {
                type: Boolean,
                default: false
            }
        }]//subitem array end
    }//subitems end

})


mongoose.model('Item', ItemSchema);