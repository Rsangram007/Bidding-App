const { createItem, getItemById, getAllItems, updateItem, deleteItem } = require('../Model/Item.Model');



const createItems = async (req, res) => {
    const { name, description, startingPrice, endTime } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await createItem(name, description, startingPrice, imageUrl, endTime);
    res.status(201).json({ item });
};
const getAllItem = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const items = await getAllItems(parseInt(limit), parseInt(offset));
    res.json({ items });
};

const getItemsById = async (req, res) => {
    const item = await getItemById(req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json({ item });
};
 
const updateItems = async (req, res) => {
    const { name, description, startingPrice, endTime } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const item = await getItemById(req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }

    // Only allow owner or admin to update
    if (item.user_id !== req.user.id && req.user.role !== 'Admin') {
        return res.status(403).send('Access denied');
    }

    const updatedItem = await updateItem(req.params.id, name, description, startingPrice, imageUrl, endTime);
    res.json({ updatedItem });
};   

const deleteItems = async (req, res) => {
    const item = await getItemById(req.params.id);
    if (!item) { 
        return res.status(404).send('Item not found');
    }
 
    // Only allow owner or admin to delete
    if (item.user_id !== req.user.id && req.user.role !== 'Admin') {
        return res.status(403).send('Access denied');
    }
 
    await deleteItem(req.params.id);
    res.status(200).json({message:"Delete Sussfully"});
};

module.exports = { createItems,getAllItem, getItemsById , updateItems, deleteItems };