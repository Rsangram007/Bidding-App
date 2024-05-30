const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads directory
  },
  filename: function (req, file, cb) {
    // Generate a unique name for the file
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create multer instance
const upload = multer({ storage: storage });
const {
  createItems,
  getAllItem,
  getItemsById,
  updateItems,
  deleteItems,
} = require("../Controller/ItemController");
const { Authorization, validateToken } = require("../Middleware/auth");

const router = express.Router();

router.post("/createItem",validateToken, upload.single("image"), createItems);
router.get("/Getitem",validateToken, getAllItem);
router.get("/:id",validateToken, getItemsById);
  
router.put("/:id",validateToken, updateItems);
router.delete("/:id", validateToken,Authorization(["Admin", "user"]), deleteItems);

module.exports = router;
  