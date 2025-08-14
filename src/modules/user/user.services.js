export const profile = async (req, res, next) => {
  try {
    const user = req.user;  
    const { password, ...userDetails } = user.toObject ? user.toObject() : user; 
    return res.status(200).json({
      message: "Profile retrieved successfully",
      user: userDetails
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve profile",
      error: error.message
    });
  }
}