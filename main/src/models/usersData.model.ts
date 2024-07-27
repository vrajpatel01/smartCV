import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    browser: {
        type: String,
    },
    os: {
        type: String,
    },
    device: {
        type: String,
    },
    ipAddress: {
        type: String,
        required: false,
        trim: true,
        // validate: {
        //     validator: function (v) {
        //         const ipValidator = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/;
        //         return ipValidator.test(v);
        //     },
        //     message: props => `${props.value} is not a valid IP Address!`
        // }
    }
}, { timestamps: true })

export default mongoose.model('UserData', userDataSchema);