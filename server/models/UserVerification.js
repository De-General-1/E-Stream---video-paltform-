import mongoose from "mongoose";

const UserVerificationSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        ref: "User",
        unique: true
    },
    token:{
        type:String,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        expires: 3600
    },
    expiresAt:{
        type: Date,
    }
    
},{timestamps: true }
);
export default mongoose.model("UserVerification", UserVerificationSchema)