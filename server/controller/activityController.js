import Activities from "../model/recentActModel.js";

export const getAllActivities = async (req, res) => {
    try{
        const activities = await Activities.find().sort({createdAt: -1 });
        res.status(200).json(activities);
    } catch(error){
        res.status(500).json({errorMessage: error.message})
    }
}