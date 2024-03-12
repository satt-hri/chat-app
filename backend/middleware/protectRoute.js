import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.state(404).json({ error: "user is not found" });
    }

    req.user = user;
    //console.log("protectRoute",user);

    next();
  } catch (error) {
    console.log("protectRoute middleware error", error);
    return res.sendStatus(500);
  }
};

export default protectRoute;
