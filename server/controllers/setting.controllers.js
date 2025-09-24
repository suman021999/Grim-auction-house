import asyncHandler from 'express-async-handler';



export const getSettings = asyncHandler(async (req, res) => {})
export const updateAccountSettings = asyncHandler(async (req, res) => {})
export const updateNotificationPreferences = asyncHandler(async (req, res) => {})
export const updatePrivacySettings = asyncHandler(async (req, res) => {})


//   const { profileVisibility, dataSharing } = req.body;
//   const user = await User.findById(req.user._id);

//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   user.privacy = {
//     visibility: profileVisibility,
//     dataSharing,
//   };

//   await user.save();
//   res.json({ message: "Privacy settings updated successfully" });