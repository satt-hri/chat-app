import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loginedUserId = req.user._id;
    const allUser = await User.find({ _id: { $ne: loginedUserId } }).select("-password");
    ///console.log("allUser",allUser)
    res.status(200).json(allUser);
  } catch (error) {
    console.log("getUsersForSidebar controller error", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
