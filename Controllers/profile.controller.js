const User = require("../Models/userSchema.model");
const { isFileTypeSupported, uploadFile } = require("../Config/util");
const path = require("path");

// update profile controller function
exports.updateProfile = async (req, res) => {
  try {
    const name = req.body?.name;
    const userId = req.user.id;
    const profilePic = req.files?.profilePic;

    // validation
    if (!name && !profilePic) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    // get the user from the database
    const user = await User.findById(userId);

    // if name is provided then add it to the user object
    if (name) {
      user.name = name;
    }

    // if profilePic is provided then upload it and add it to the user object
    if (profilePic) {
      if (isFileTypeSupported(path.extname(profilePic.name))) {
        const response = await uploadFile(profilePic.tempFilePath);
        user.profilePic = response.secure_url;
      }
    }

    // save the updated user in the database
    await user.save();

    // return the success response
    return res.status(200).json({
      success: true,
      message: "Profile has been updated successfully",
    });
  } catch (error) {
    console.log(
      "Error in the update profile controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
