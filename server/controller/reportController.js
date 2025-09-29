import Report from '../model/reportModel.js';
import Activities from "../model/recentActModel.js";


export const createReport = async (req, res) => {
    try {
        const newReport = new Report({
            ...req.body,
            user: req.user.id
        })
        const savedData = await newReport.save();

        const newActivity = new Activities({
            user: req.user.id,
            action: "Create new",
            fileType: "ROA",
            itemId: savedData.reportId
        })

        await newActivity.save();
        res.status(201).json({message: "New report created"});
        
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getReports = async (req, res) => {
    try {
        const reportData = await Report.find();
        if(!reportData || reportData.length === 0){
            return res.status(404).json({message: "Report data not found."})
        }
        res.status(200).json(reportData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getReportsId = async (req, res) => {
    try {
        const reportId = req.params.id;
        const reportExist = await Report.findById(reportId);
        if(!reportExist){
            return res.status(404).json({message: "Report data not found."})
        }
        res.status(200).json(reportExist);
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

export const userReports = async (req, res) => {
    try {
        const userId = req.user.id;
        const reportData = await Report.find({user: userId});
        if(!reportData || reportData.length === 0){
            return res.status(404).json({message: "Report data not found."})
        }
        res.status(200).json(reportData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const deleteReports = async (req, res) => {
    try {
        const reportId = req.params.id
        const userId = req.user.id
        
        const reportExists = await Report.findOne({
            user: userId,
            _id: reportId
        });

        if(!reportExists){
            return res.status(404).json({message: "Report data not found. Access denied!"})
        }

        const deletedReport = await Report.findByIdAndDelete(reportId)

        const newActivity = new Activities({
            user: req.user.id,
            action: "Deleted",
            fileType: "ROA",
            itemId: deletedReport.reportId
        })

        await newActivity.save();
        res.status(200).json({message: "Report deleted succssfully"})

    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const updateReports = async (req, res) => {
    try {
        const reportId = req.params.id
        const userId = req.user.id

        const reportExists = await Report.findOne({
            user: userId,
            _id: reportId
        })

        if(!reportExists){
            return res.status(404).json({message:"Report data not found. Access denied!"})
        }

        const newReportData = await Report.findByIdAndUpdate(reportId, req.body, {
            new: true
        })

        const newActivity = new Activities({
            user: userId,
            action: "Updated",
            fileType: "ROA",
            itemId: newReportData.reportId
        })

        await newActivity.save();
        res.status(200).json({message: "Report updated successfully"});
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}