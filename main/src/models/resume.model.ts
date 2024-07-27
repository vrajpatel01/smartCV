import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const resumeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        lowercase: true
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
    data: {
        type: Object,
    },
    visibility: {
        type: Boolean,
        default: true
    },
    statistics: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Statistics'
    }
}, { timestamps: true });

resumeSchema.plugin(mongooseAggregatePaginate);
resumeSchema.pre('save', async function (next) {
    if (!this.isModified('title')) return next();
    this.slug = this.title.toLowerCase().split(' ').join('-');
    next();
})

export default mongoose.model('Resume', resumeSchema);