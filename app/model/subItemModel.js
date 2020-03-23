const mongoose =  require('mongoose')
const Schema = mongoose.Schema;

let subItemSchema = new Schema({
    itemId:{
        type:String,
        default:''
    },

    subItems:{
        type:[{
            subItemId:{
                type:String,
                default:''
            },
            subItemCreatorId:{
                type:String,
                default:''
            },
            subItemCreatedOn:{
                type:Date,
                default:''
            },
            subItemTitle:{
                type:String,
                default:''
            },
            subItemModifiedOn:{
                type:Date,
                default:''
            },
            subItemModifierId:{
                type:String,
                default:''
            },
            subItemDone:{
                type:Boolean,
                default:false
            }
        }]
    }
})

mongoose.model('subItem',subItemSchema);