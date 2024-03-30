const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        trim: true,
        maxlength: 50,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
        trim: true,
        maxlength: 50,
        minlength: 3,
    },
    userName: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true,
        maxlength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        maxlength: 150,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Phone number is required"],
        trim: true,
        maxlength: 20,
        lowercase: true,
    },
    password:{
        type: String,
        required:[true,"password is required"],
        trim:true,
        minLength:8,
        trim: true,

    },
    passwordConfirm:{
       
            type: String,
            required:[true,"please confirm password"],
            trim:true,
            minLength:8,
            trim: true,

    },
    passwordChangedAt: Date,
    
    role:{
        type: String,
        default:"user",
        enum: ["user", "admin"], // Allowed values for account status
        required:true,
    },
    orders:[
        {
          type: Schema.Types.ObjectId,
          ref: "Order"
        },
    ],

    gender: {
        type: String,
        required: [true, "Gender is required"],
        trim: true,
        maxlength: 7,
    },
    shippingAddress: {
        type: String,
        required: [true, "Shipping address is required"],
        trim: true,
        maxlength: 150,
    },
    billingAddress: {
        type: String,
        required: [true, "Billing address is required"],
        trim: true,
        maxlength: 150,
    },
    accountStatus: {
        type: String,
        enum: ["active", "inactive", "suspended"], // Allowed values for account status
        
    },
    
},

{ timestamps: true}
);
module.exports = mongoose.model("User", userSchema);


