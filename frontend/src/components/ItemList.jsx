import React, { useState, useEffect } from 'react';
import { getItems, createItem, deleteItem, updateItem } from '../services/ItemService';
import '../App.css';

function ItemList() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [updatedItemName, setUpdatedItemName] = useState('');
    const [itemIdToUpdate, setItemIdToUpdate] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editItemName, setEditItemName] = useState('');

    // CALLS ONCE ON MOUNT
    useEffect(() => {
      fetchItems();
    }, [items]);

    const handleEditClick = (item) => {
      setEditingItemId(item.id);
      setEditItemName(item.name);
    };

    const handleSaveClick = async () => {
      if (editingItemId) {
        try {
          const response = await updateItem(editingItemId, editItemName);
          setItems(items.map(item => (item.id === editingItemId ? response.data : item)));
          setEditingItemId(null);
          setEditItemName('');
        } catch (error) {
          console.error('Error updating item:', error);
        }
      }
    }

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

    const handleUpdate = async () => {
      if (itemIdToUpdate) {
        try {
          const response = await updateItem(itemIdToUpdate, updatedItemName);
          setItems(items.map(item => (item.id === itemIdToUpdate ? response.data : item)));
          setItemIdToUpdate('');
          setUpdatedItemName('');
        } catch (error) {
          console.error('Error updating item:', error);
        }
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
