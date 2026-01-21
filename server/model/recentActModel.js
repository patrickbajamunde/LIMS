import mongoose from "mongoose";

const activitiesSchema = new mongoose.Schema({
    action: {
        type: String,
        enum: ['Create new', 'Updated', 'Deleted'],
    },

    fileType: {
        type: String,
        enum: ['Arf', 'ROA']
    },

    itemId: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: {
        type: String
    }

})

export default mongoose.model("Activities", activitiesSchema, "recentActivities");