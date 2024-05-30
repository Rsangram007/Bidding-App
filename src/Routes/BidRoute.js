const express = require("express");
const { getBidsByItemIds, createBidding } = require("../Controller/BidController");
const { Authorization, validateToken } = require("../Middleware/auth");

const router = express.Router();

router.post("/:itemId/bids", validateToken, createBidding);
router.get("/:itemId/bids",validateToken, getBidsByItemIds);

module.exports = router;
