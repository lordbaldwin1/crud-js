import React, { useState, useEffect } from 'react';
import { getItems, createItem, deleteItem, updateItem, getItemById } from '../services/ItemService';
import '../App.css';

function ItemList() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [updatedItemName, setUpdatedItemName] = useState('');
    const [itemIdToUpdate, setItemIdToUpdate] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editItemName, setEditItemName] = useState('');

    // CALLS ONCE ON MOUNT OR WHEN items array is changed
    useEffect(() => {
      fetchItems();
    }, []);

    const handleEditClick = (item) => {
      setEditingItemId(item.id);
      setEditItemName(item.name);
    };

    const handleSaveClick = async () => {
      if (editingItemId) {
        try {
          // First, update the item on the server
          await updateItem(editingItemId, editItemName);
    
          // Update the local state without an extra API call
          //
          setItems(items.map(item => (
            item.id === editingItemId ? { ...item, name: editItemName } : item
          )));
    
          // Clear the editing state to exit edit mode
          setEditingItemId(null);
          setEditItemName('');  // Clear the input field after save
        } catch (error) {
          console.error('Error updating item:', error);
        }
      }
    };

    const refreshItems = async () => {
      try {
        const response = await getItems();
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await getItems();
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items: ', error);
      }
    };

    const handleCreate = async () => {
      try {
        const response = await createItem(newItemName);
        setNewItemName('');
      } catch (error) {
        console.error('Error creating item:', error);
      }
    }

    const handleDelete = async (id) => {
      try {
        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
      } catch (error) {
        console.log('Error deleting item:', error);
      }
    };

    return (
      <div>
        <h1>Items List</h1>
    
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
    
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="text"
                      value={editItemName}
                      onChange={e => setEditItemName(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>
    
                <td>
                  {editingItemId === item.id ? (
                    <>
                      <button onClick={handleSaveClick}>Save</button>
                      <button onClick={() => setEditingItemId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                  )}
                </td>
                <td>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    
        <div>
          <input
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            placeholder="New item name"
          />
        </div>
    
        <button onClick={handleCreate}>Add Item</button>
        <button onClick={refreshItems}>Refresh</button>
      </div>
    );
    
}

export default ItemList;
