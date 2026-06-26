import mongoose, { Schema, model } from "mongoose";
import { randomBytes } from "crypto";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: () => randomBytes(32).toString('base64url')
    },
    confirmed: {
        type: Boolean,
        default: false
    }

});

const User = model('User', UserSchema);

export default User;