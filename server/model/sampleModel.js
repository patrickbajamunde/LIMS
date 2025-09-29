import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
    
    sampleDescription:{
        type: String,
        required: true
    },
    testParameter:{
        type: String,
        required: true
    },
    sampleResult:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

export default mongoose.model("Sample", sampleSchema)