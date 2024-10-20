import db from '../db.js';

// req = request | res = response
// 
// uses db object to query all items into an array, stores them in
// response as a json array
export async function getAllItems(req, res) {
    try {
        const items = await db.select('*').from('items');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items' });
    }
}

// takes in INSERT request, req.body contains data sent
// in that request, inserts that data into items table
// returns that newly created item with returning('*')
// into result[]
export async function createItem(req, res) {
    // takes the item's name from req.body
    const { name } = req.body;
    try {
        const result = await db('items').insert({ name }).returning('*');
        res.status(201).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error creating item' });
    }
}

// deletes item from db based on id URL parameter
// deletes item from items table where id matches the given
export async function deleteItem(req, res) {
    // if DELETE request to /api/items/2, req.params.id would be 2
    const { id } = req.params;
    try {
        await db('items').where({ id }).del();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item' });
    }
}

export async function updateItem(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await db('items').where({ id }).update({ name }).returning('*');

        if (result.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error updating item' });
    }
}