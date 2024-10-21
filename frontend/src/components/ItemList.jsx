import React, { useState, useEffect } from 'react';
import { getItems, createItem, deleteItem, updateItem } from '../services/ItemService';

function ItemList() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [updatedItemName, setUpdatedItemName] = useState('');
    const [itemIdToUpdate, setItemIdToUpdate] = useState(null);

    /* MORE COMPLICATED WAY USING AXIOS FUNCTIONS
    useEffect(() => {
        // axios function returns promise
        // then() is called when the promise is resolved
        // inside then is a callback takes in response
        // and updates items with response.data
        getItems().then(response => setItems(response.data));
    }, []); // called once on mount
    */
    // CALLS ONCE ON MOUNT
    useEffect(() => {
      fetchItems();
    }, []);

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

    /* MORE COMPLICATED WAY USING AXIOS FUNCTIONS
    const handleCreate = () => {
        createItem(newItemName).then(response => {
            setItems([...items, response.data]);
            setNewItemName('');
        });
    };
    */

    const handleCreate = async () => {
      try {
        const response = await createItem(newItemName);
        setNewItemName('');
      } catch (error) {
        console.error('Error creating item:', error);
      }
    }

    /* USES AXIOS FUNCTIONS?
    const handleDelete = (id) => {
        deleteItem(id).then(() => {
            // for each item(index) in items see if item.id
            // is not equal to id, if that is true(they don't match)
            // then include in new array, else exclude it
            setItems(items.filter(item => item.id !== id));
        });
    };
    */

    const handleDelete = async (id) => {
      try {
        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
      } catch (error) {
        console.log('Error deleting item:', error);
      }
    };

    /*
    const handleUpdate = (id) => {
      createItem(newItemName).then(response => {
          setItems([...items, response.data]);
          setNewItemName('');
      });
  };
  */

    const handleUpdate = async () => {
      if (itemIdToUpdate) {
        try {
          const response = await updateItem(itemIdToUpdate, updatedItemName);
          setItems(items.map(item => (item.id === itemIdToUpdate ? response.data : item)));
          setItemIdToUpdate(null);
          setUpdatedItemName('');
        } catch (error) {
          console.error('Error updating item:', error);
        }
      }
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
          <input
            value={updatedItemName}
            onChange={(e) => setUpdatedItemName(e.target.value)}
            placeholder="Updated item name"
          />
          <button onClick={handleUpdate}>Update Item</button>
          <button onClick={handleCreate}>Add Item</button>
          <button onClick={refreshItems}>Refresh</button>
        </div>
      );
}

export default ItemList;
