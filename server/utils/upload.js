// upload.js
import multer from "multer";

// Multer Memory Storage (no local folder)
const storage = multer.memoryStorage();

export const upload = multer({ storage });



