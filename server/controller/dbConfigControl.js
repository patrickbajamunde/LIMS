import Client from "../model/clientModel.js";
import Report from "../model/reportModel.js";

export const countRegulatory = async (req, res) => {
    try {
        const userId = req.user.id;
        const regData = await Client.find({user: userId, clientType: 'Regulatory'});
        const numOfDocs = regData.length;
        res.status(200).json({ count: numOfDocs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const countCorn = async (req, res) => {
    try {
        const userId = req.user.id;
        const cornData = await Client.find({user: userId, clientType: 'Corn Program'});
        const numOfDocs = cornData.length;
        res.status(200).json({ count: numOfDocs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const countLgu = async (req, res) => {
    try {
        const userId = req.user.id;
        const lguData = await Client.find({user: userId, clientType: 'LGU'});
        const numOfDocs = lguData.length;
        res.status(200).json({ count: numOfDocs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const countResearch = async (req, res) => {
    try {
        const userId = req.user.id;
        const resData = await Client.find({user: userId, clientType: 'Research'});
        const numOfDocs = resData.length;
        res.status(200).json({ count: numOfDocs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const countWalkin = async (req, res) => {
    try {
        const userId = req.user.id;
        const walkData = await Client.find({user: userId, clientType: ['Student', 'Private', 'Farmer']});
        const numOfDocs = walkData.length;
        res.status(200).json({ count: numOfDocs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const countHVC = async (req, res) => {
    try {
        const userId = req.user.id;
        const hvcData = await Client.find({user: userId, clientType: 'High Value Crops Program'});
        const numOfDocs = hvcData.length;
        res.status(200).json({ count: numOfDocs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const countRice = async (req, res) => {
    try {
        const userId = req.user.id;
        const riceData = await Client.find({user: userId, clientType: 'Rice Program'});
        const numOfDocs = riceData.length;
        res.status(200).json({ count: numOfDocs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const countGovtAgency = async (req, res) => {
    try {
        const userId = req.user.id;
        const gaData = await Client.find({user: userId, clientType: 'Government Agency'});
        const numOfDocs = gaData.length;
        res.status(200).json({ count: numOfDocs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}


export const getForRelease = async (req, res) =>{
    try {
        const userId = req.user.id;
        const forRelease = await Report.find({user: userId, status: "For release"});
        res.status(200).json(forRelease);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getReleased = async (req, res) =>{
    try {
        const userId = req.user.id;
        const forRelease = await Report.find({user: userId, status: "Released"});
        res.status(200).json(forRelease);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}