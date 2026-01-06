import mongoose from "mongoose";

const roaModel = new mongoose.Schema({
     labCode:{
        type: String,
    },

    sampleCode:{
        type: String,
    },

    sampleDescription:{
        type: String,
    },

    sampleParam:{
        type: String,
    },

    result:{
        type: String
    },

    testMethod:{
        type: String
    },
})

const reportSchema = new mongoose.Schema({
    
    customerName:{
        type: String,
    },

    customerAddress:{
        type: String,
    },

    customerContact:{
        type: String
    },

    dateReceived:{
        type: Date,
    },

    datePerformed:{
        type: String,
    },

    dateIssued:{
        type: Date
    },

    reportId:{
        type: String,
        unique: true
    },

    analyzedBy:{
        type: String,
    },  
    analystPRC:{
        type: String,
    },
    position :{
        type: String,
    },
    analyzedBy2:{
        type: String,
    }, 
    analystPRC2:{
        type: String,
    },

    position2 :{
        type: String,
    },

    status:{
        type: String,
    },

    roaDetails: [roaModel],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },


})

export default mongoose.model("Report", reportSchema, "reports")