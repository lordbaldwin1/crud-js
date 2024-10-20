const db = require('../db');

exports.getAllItems = async (req, res) => {
    try {
        const items = await db.select('*').from('items');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items' });
    }
};

exports.createItem = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await db('items').insert({ name }).returning('*');
        res.status(201).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error creating item' });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await db('items').where({ id }).del();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item' });
    }
};