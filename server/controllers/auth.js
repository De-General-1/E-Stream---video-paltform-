import User from "../models/User.js"
import userVerification from "../models/userVerification.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Utilities/email.js";
import crypto from 'crypto'; 

export const signup = async (req,res,next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash}) 

        await newUser.save();

        const token = await new userVerification({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save()
        const verifyEmailUrl = `${req.protocol}://${req.get('host')}/api/auth/${newUser._id}/verifyEmail/${token.token}`

        const message = `Click on this link to verify your account \n\n${verifyEmailUrl}\n\nThe link epires after 1hr`

        await sendEmail(newUser.email, "Verify Your Email", verifyEmailUrl);

        try{
            await sendEmail({
                email: newUser.email,
                subject: "Verify Your Email",
                message
            });
            res.status(200).json({
                status: "Success",
                message: "An Email has been sent to the email provided, please Verify ",
                
            })
        }catch(err){
            console.log(err)
            return next(createError(400, "Something went wrong"));
        }

    }catch(err){
        //TODO
        console.log(err)
        next(createError(500, "Something went wrong with creating an account"))
    }
}

export const signin = async (req,res,next) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(createError(404, "User not found"))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrect) return next(createError(400, "Wrong credentials"))
        
        if(user.verified){
            const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT)
            const {password, ...others} = user._doc;

            res.cookie("access_token", token, {
                httpOnly:true
            }).status(200).json({ others, isAdmin: user.isAdmin})
        }else{
            res.status(200).json({
                status: "Failure",
                message: "User is not verified",   
            })
        }

    }catch(err){
        //TODO
        console.log(err)
        next(createError(500, "Something went wrong while signing in"))
    }
}

export const logout = async(req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.status(200).json({ message: 'Logged out successfully' });
}

export const verifyEmail = async(req, res, next) => {
    try{
        const user = await User.findOne({_id: req.params.id});
        if(!user) return next(createError(400, "User not found"))

        const token = await userVerification.findOne({
            userId: user._id,
            token: req.params.token,
        })

        if(!token) return next(createError(400, "Invalid Link"))
        await User.findByIdAndUpdate(user._id,{
            verified: true
        },
        {new:true})    
        // await User.updateOne({_id: user._id, verified: true})   
        await token.deleteOne()
        
       console.log("Email verified successfully and logged in")

        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json(user)

    }catch(err){
        console.log(err)
        next(createError(500, "Internal Server error"))
    }
}

export const forgotPassword = async (req,res, next) => {
    //1. Get user based on posted email
    const user = await User.findOne({ email: req.body.email })
    if(!user) return next(createError(404, "User with this email cannot be found!"))

    //2. Generate a random reset password token
    const resetToken = user.createResetPasswordToken();
    await user.save({validateBeforeSave: false });

    //3. Send the token back to the user email
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${resetToken}`;

    const message = `A password reset request has been made, please use the link below to reset your password\n\n${resetUrl}\n\nThe link epires after 10mins`

    try{
        await sendEmail({
            email: user.email,
            subject: "Request to change password has been recieved",
            message
        });

        res.status(200).json({
            status: "Success",
            message: "Password reset link has been sent to the user.",
            
        })
    }catch(err){
        user.passwordResetToken = undefined
        user.passwordResetTokenExpires = undefined
        await user.save({validateBeforeSave: false })

        return next(err);
    }
    
}

export const passwordReset = async (req,res, next) => {
    //1. Checking if the user exist and the token hasn't yet expired
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now()}});

    if(!user) return next(createError(400, "Token is invalid or has expired"));

    if(req.body.password == "" && req.body.confirmPassword == "" || req.body.password != req.body.confirmPassword){
        return next(createError(400, "Password has a problem!"));
    }


    //Resetting the user password
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();
    console.log(user)

    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
        await user.save()
        console.log(user)
    }catch(err){
        next(createError(500, "Something went wrong in changing password"))
    }
        

    //Login the user

    const loginToken = jwt.sign({id:user._id}, process.env.JWT)
    const {password, ...others} = user._doc;

    res.cookie("access_token", loginToken, {
        httpOnly:true
    }).status(200).json(others)
    console.log("User password has been changed! and logged in")

}