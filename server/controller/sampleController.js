import Sample from "../model/sampleModel.js"

export const create = async (req, res) => {
    try {
        const newSample = new Sample ({
            ...req.body,
            user: req.user.id
        });
        const savedData = await newSample.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
};


export const getSamples = async (req, res) => {
    try {
        const sampleData = await Sample.find();
        if(!sampleData || sampleData.length === 0){
            return res.status(404).json({message: "Sample data not found."})
        }
        res.status(200).json(sampleData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getSamplesId = async (req, res) => {
    try{
        const id = req.params.id;
        const sampleExist = await Sample.findById(id);
        if(!sampleExist){
            return res.status(404).json({message: "Sample data not found."})
        }
        res.status(200).json(sampleExist);
    }catch(error){
        res.status(500).json({errorMessage: error.message})
    }
}

export const userSamples = async (req, res) => {
    try { 
        const userId = req.user.id;
        const sampleData = await Sample.find({ user: userId });
        if(!sampleData || sampleData.length === 0){
            return res.status(404).json({message: "Sample data not found."})
        }
        res.status(200).json(sampleData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}