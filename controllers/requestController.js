const User = require("../models/userSchema");
const Request = require("../models/requestSchema");

const checkExistingFriendRequest = async (req, status) => {
    try {
        const checkExistence = await Request.find({
            $and: [
                {
                    $and: [
                        { senderID: req.body.senderID },
                        { receiverId: req.body.receiverID }
                    ]
                },
                { requestStatus: { $eq: status } }
            ]
        });
        return checkExistence.length;
    } catch (err) {
        console.log(err);
    }
};

const limitRequests = async (req, maxNumberOfRequests, status) => {
    try {
        const request = await checkExistingFriendRequest(req, status);
        return request >= maxNumberOfRequests;
    } catch (err) {
        console.log(err);
    }
};

const cancelOrDeleteRequest = async (req, status, Cancel) => {
    try {
        const existingRequests = await checkExistingFriendRequest(req, status);

        if (existingRequests.length === 0) {
            return false; 
        }

        if (Cancel) {
            await Request.deleteOne({ senderID: req.body.senderID, 
                 receiverId: req.body.receiverID,
                 requestStatus: status });
        } else {
            await Request.deleteOne({ senderID: req.body.senderID, 
                 receiverId: req.body.receiverID,
                 requestStatus: status });
        }
        return true; 
    } catch (err) {
        console.log(err);
        
    }
};
const sendFriendRequest = async (senderId, receiverId) => {
    try {
        const existingRequests = await checkExistingFriendRequest(req,status);
        if (existingRequests.length === 0) {
            return false;
        }

        if (existingRequests.lengt > 0) {
            console.log("Friend request already sent.");
            return false;
        }
        const newRequest = new Request.crate({
            senderID:req.body.senderId,
            receiverId: req.body.receiverId,
            requestStatus: req.body.status
        });
        await newRequest.save();

        console.log("Friend request sent successfully.");
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const acceptFriendRequest = async (senderId, receiverId, status) => {
    try {
        const existingRequests = await checkExistingFriendRequest(req, status);

        if (existingRequests.length === 0) {
            console.log("Friend request not found or does not match the specified status.");
            return false;
        }
        await Request.updateMany(
            {
                senderID: req.bodsenderId,
                receiverId: req.body.receiverId,
                requestStatus: req.body.status
            },
            { $set: { requestStatus: "accepted" } }
        );

        console.log("Friend requests accepted successfully.");
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
