const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const requestSchena = new Schema({
    senderId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status:{
        type: String,
        enum: ['Pending', 'accepted', 'canceled','deleted'],
    }
    

}
,{ timestamps: true}
);
module.exports = mongoose.model("Request", requestSchena);
