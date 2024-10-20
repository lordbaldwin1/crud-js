import React, { useState, useEffect } from 'react';
import { getItems, createItem, deleteItem } from '../services/ItemService';

function ItemList() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');

    useEffect(() => {
        // axios function returns promise
        // then() is called when the promise is resolved
        // inside then is a callback takes in response
        // and updates items with response.data
        getItems().then(response => setItems(response.data));
    }, []); // called once on mount

    const handleCreate = () => {
        createItem(newItemName).then(response => {
            setItems([...items, response.data]);
            setNewItemName('');
        });
    };

    const handleDelete = (id) => {
        deleteItem(id).then(() => {
            // for each item(index) in items see if item.id
            // is not equal to id, if that is true(they don't match)
            // then include in new array, else exclude it
            setItems(items.filter(item => item.id !== id));
        });
    };

    return (
        <div>
          <h1>Items List</h1>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <input
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            placeholder="New item name"
          />
          <button onClick={handleCreate}>Add Item</button>
        </div>
      );
}

export default ItemList;
