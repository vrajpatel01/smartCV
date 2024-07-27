import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { ACCESS_TOKEN_EXPIRES_IN, JWT_SECRET, REFRESH_TOKEN_EXPIRES_IN, SAULT_ROUND } from "../config";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        length: [3, 50],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                const emailValidator = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
                return emailValidator.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    role: {
        type: String,
        enum: ['admin', 'supporter'],
        default: 'admin',
        require: [true, 'Role is required']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    resetPasswordToken: {
        type: String,
        default: null,
        trim: true
    },
    refreshToken: {
        type: String,
        default: null,
        trim: true
    },
    theme: {
        type: String,
        default: 'system',
        enum: ['system', 'light', 'dark'],
    },
    twoFactorAuth: {
        type: Boolean,
        default: false
    },
    twoFactorSecret: {
        type: String,
        default: null
    },
    ipAddress: {
        type: String,
        required: false,
        trim: true,
        validate: {
            validator: function (v) {
                const ipValidator = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/;
                return ipValidator.test(v);
            },
            message: props => `${props.value} is not a valid IP Address!`
        }
    }
}, { timestamps: true })

adminSchema.plugin(mongooseAggregatePaginate);
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, parseInt(SAULT_ROUND as string))
    next();
})

adminSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.accessToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET as string, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })
}

adminSchema.methods.refToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET as string, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })
}

export default mongoose.model('Admin', adminSchema);