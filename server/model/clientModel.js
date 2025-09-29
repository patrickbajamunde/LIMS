import mongoose from "mongoose";

const sampleModel = new mongoose.Schema({
    
    sampleDescription: {
        type: String,
    },

    parameterReq: {
        type: String,
    },

    methodReq:{
        type: String,
    },
    sampleCode: {
        type: String,
    }, 
    labCode:{
        type: String,
    }
});


const clientSchema = new mongoose.Schema ({

    requestId:{
        type: String,
        required: true,
        unique: true,
    },
    clientType: {
        type: String,
        required: true,
    },

    clientName: {
        type: String,
        required: true,
    },

    clientAddress: {
        type: String,
        required: true,
    },

    clientEmail: {
        type: String,
        required: true,
    },

    clientGender: {
        type: String,
        required: true,
    },

    sampleDisposal: {
        type: Date,
        required: true,
    },

    reportDue :{
        type: Date,
        required: true,
    },

    transactionDate: {
        type: Date,
        default: Date.now,
        required: true,
    },

    receivedBy:{
        type: String,
        required: true, 
    },

    status:{
        type: String,
    },

    sampleDetails: [sampleModel],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

})

export default mongoose.model("Client", clientSchema, "clients");
