const blacklistTokenModel = require('../models/blacklistToken-model');
const userModels = require('../models/user-model');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain-model');

module.exports.isLoggedIn = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        const isBlacklisted = await blacklistTokenModel.findOne({ token: token});
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModels.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.isCaptain = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Captain Unauthorized' });
        }
    
        const isBlacklisted = await blacklistTokenModel.findOne({ token: token});
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Blacklisted Token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Token Validation Failed' });
        }
        req.captain = captain;
        next();

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: 'Unauthorized' });
    }
}