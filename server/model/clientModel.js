import mongoose from "mongoose";

const sampleModel = new mongoose.Schema({

    sampleDescription: {
        type: String,
    },

    parameterReq: {
        type: String,
    },

    methodReq: {
        type: String,
    },
    sampleCode: {
        type: String,
    },
    labCode: {
        type: String,
    }
})

const ArfAttachment = new mongoose.Schema({
    sampleDescription: {
        type: String,
    },

    parameterReq: {
        type: String,
    },

    methodReq: {
        type: String,
    },
    sampleCode: {
        type: String,
    },
    labCode: {
        type: String,
    },
    Barangay:{
        type: String,
    },
    Municipality:{
        type: String,
    },
    Province:{
        type: String,
    }
})


const clientSchema = new mongoose.Schema({

    requestId: {
        type: String,
        required: true,
        unique: true,
    },
    clientType: {
        type: String,
    },

    clientName: {
        type: String,
    },

    clientAddress: {
        type: String,
    },

    clientEmail: {
        type: String,
    },

    clientGender: {
        type: String,
    },

    sampleDisposal: {
        type: Date,
    },

    reportDue: {
        type: Date,
    },

    transactionDate: {
        type: Date,
        default: Date.now,
    },

    receivedBy: {
        type: String,
    },

    status: {
        type: String,
    },

    sampleDetails: [sampleModel],
    ArfAttachment: [ArfAttachment],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

})

export default mongoose.model("Client", clientSchema, "clients");
