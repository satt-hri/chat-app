import User from "../models/user.model.js";

export const sigup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // hash password 

    //https://avatar-placeholder.iran.liara.run/#document
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

    const newUser =  new User({
        fullName,
        username,
        password,
        gender,
        profilePic:gender == "male" ?boyProfilePic :girlProfilePic
    })

    await newUser.save()

    res.status(201).json({
        _id:newUser._id,
        fullName,
        username,
        profilePic:newUser.profilePic
    })

  } catch (error) {
    console.log("SignUp Error",error);
    res.status(500).json({error:"Internal server error"})
  }
};

export const login = (req, res) => {
  console.log("login");
};
export const logout = (req, res) => {
  console.log("logout");
};
