import Client from "../model/clientModel.js";
import Activities from "../model/recentActModel.js";

export const createClient = async (req, res) => {
    try {
        const newClient = new Client({
            ...req.body,
            user: req.user.id
        });
        const savedData = await newClient.save();
        const newActivity = new Activities({
            user: req.user.id,
            action: "Create new",
            fileType: "Arf",
            itemId: savedData.requestId,
        })
        await newActivity.save();
        res.status(201).json({ message: "New client created" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
};


//fetch arf data without aunthentication 
export const getClient = async (req, res) => {
    try {
        const clientData = await Client.find();
        if (!clientData || clientData.length === 0) {
            return res.status(404).json({ message: "Sample data not found." })
        }
        res.status(200).json(clientData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const getClientId = async (req, res) => {
    try {
        const id = req.params.id;
        const clientExist = await Client.findById(id);
        if (!clientExist) {
            return res.status(404).json({ message: "Sample data not found." })
        }
        res.status(200).json(clientExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}


//Fetch Arf data based on user id
export const userRequest = async (req, res) => {
    try {
        const userid = req.user.id;
        const requestData = await Client.find({ user: userid });
        if (!requestData || requestData.length === 0) {
            return res.status(404).json({ message: "Request data not found." })
        }
        res.status(200).json(requestData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const userId = req.user.id;

        const requestExist = await Client.findOne({
            user: userId,
            _id: requestId
        })

        if (!requestExist) {
            return res.status(404).json({ message: "Arf data not found" })
        }

        const deletedRequest = await Client.findByIdAndDelete(requestId);
        
        const newActivity = new Activities({
            user: req.user.id,
            action: "Deleted",
            fileType: "Arf",
            itemId: deletedRequest.requestId
        })

        await newActivity.save();
        res.status(200).json({ message: "Arf deleted successfully" })
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const updateRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const userId = req.user.id;

        const requestExist = await Client.findOne({
            user: userId,
            _id: requestId
        })

        if (!requestExist) {
            return res.status(404).json({ message: "Arf data not found" })
        }

        const newRequestData = await Client.findByIdAndUpdate(requestId, req.body, {
            new: true
        })

        const newActivity = new Activities({
            user: userId,
            action: "Updated",
            fileType: "Arf",
            itemId: newRequestData.requestId,
        })
        await newActivity.save();

        res.status(200).json(newActivity)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}