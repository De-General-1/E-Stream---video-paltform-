import mongoose from "mongoose";
import crypto from "crypto";
import { type } from "os";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verified:{
        type: Boolean,
        default: false,
    },
    img:{ 
        type:String,
    },
    subscibers:{
        type: Number,
        default: 0,
    },
    subscribedUsers:{
        type: [String],
    },
    passwordChangedAt: {
        type: Date
    },
    passwordResetToken: {
        type: String
    },
    passwordResetTokenExpires:{
        type: Date
    }
    
},



{timestamps: true }

);

UserSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    console.log("Here",resetToken, this.passwordResetToken);

    return resetToken;
}

export default mongoose.model("User", UserSchema)