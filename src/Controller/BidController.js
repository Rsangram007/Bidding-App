const { createBid, getBidsByItemId } = require("../Model/Bid.Model");
const { getItemById, updateItemforbid } = require("../Model/Item.Model");
const { createNotification } = require("../Model/Notification");

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Real-time bidding via Socket.io
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("bid", (data) => {
    io.emit("update", data); // Notify all connected clients about the new bid
  });

  socket.on("notify", (data) => {
    io.emit("notify", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const createBidding = async (req, res) => {
  const { bidAmount } = req.body;
  const item = await getItemById(req.params.itemId);
  console.log("details", item);
  if (!item) {
    return res.status(404).send("Item not found");
  }

  if (bidAmount <= item.current_price) {
    return res.status(400).send("Bid amount must be higher than current price");
  }

  const bid = await createBid(req.params.itemId, req.user.id, bidAmount);
  await updateItemforbid(item.id, { current_price: bidAmount });
  console.log("bid", bid);
  // Notify item owner
  const message = `Your item "${item.name}" has a new bid of $${bidAmount}`;
  const notificatiocreate = await createNotification(bid.user_id, message);
  console.log("notification", notificatiocreate);

  io.emit("bid", { itemId: item.id, bid });

  res.status(201).json({ bid });
};
const getBidsByItemIds = async (req, res) => {
  const bids = await getBidsByItemId(req.params.itemId);
  res.json({ bids });
};

module.exports = { getBidsByItemIds, createBidding };
