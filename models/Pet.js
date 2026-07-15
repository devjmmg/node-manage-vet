import mongoose, { Schema, model } from "mongoose";

const PetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    registrationDate: {
        type: Date,
        required: true,
        trim: true
    },
    symptoms: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
});

const Pet = model('Pet', PetSchema);

export default Pet;