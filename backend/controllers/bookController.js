import db from '../db.js';

export async function getBooks(req, res) {
    try {
        const books = await db.select('*').from('books');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books' });
    }
};

export async function createBook(req, res) {
    const { title, author, published_year, in_stock } = req.body;
    try {
        const result = await db('books').insert({ title, author, published_year, in_stock }).returning('*');
        res.status(201).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error creating book' });
    }
};

export async function deleteBook(req, res) {
    const { id } = req.params;
    try {
        const result = await db('books').where({ id }).del();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book' });
    }
};

export async function updateItem(req, res) {
    const { id } = req.params;
    const { title, author, published_year, in_stock } = req.body;
    try {
        const result = await db('books').where({ id }).update({ title, author, published_year, in_stock }).returning('*');

        if (result.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error updating book' });
    }
}