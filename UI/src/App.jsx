import React from 'react';
import DataList from './DataList';




const App = () => {


// const addItem = () => {
//   axios.post('http://localhost:5000/items', { name: newItem })
//       .then(response => {
//           setItems([...items, response.data]);
//           setNewItem('');
//       })
//       .catch(error => console.error(error));
// };

// const updateItem = () => {
//   axios.put(`http://localhost:5000/items/${editItem.id}`, { name: editItem.name })
//       .then(() => {
//           setItems(items.map(item => (item.id === editItem.id ? editItem : item)));
//           setEditItem({ id: null, name: '' });
//       })
//       .catch(error => console.error(error));
// };

// const deleteItem = id => {
//   axios.delete(`http://localhost:5000/items/${id}`)
//       .then(() => setItems(items.filter(item => item.id !== id)))
//       .catch(error => console.error(error));
// };
  return(
    <>
    <DataList/>
    </>
  // <div>
  //           <h1>CRUD Application</h1>
  //           <input
  //               type="text"
  //               value={newItem}
  //               onChange={e => setNewItem(e.target.value)}
  //               placeholder="New item"
  //           />
  //           <button onClick={addItem}>Add Item</button>

  //           <ul>
  //               {items.map(item => (
  //                   <li key={item.id}>
  //                       {item.name}
  //                       <button onClick={() => setEditItem({ id: item.id, name: item.name })}>Edit</button>
  //                       <button onClick={() => deleteItem(item.id)}>Delete</button>
  //                   </li>
  //               ))}
  //           </ul>

  //           {editItem.id && (
  //               <div>
  //                   <input
  //                       type="text"
  //                       value={editItem.name}
  //                       onChange={e => setEditItem({ ...editItem, name: e.target.value })}
  //                   />
  //                   <button onClick={updateItem}>Update Item</button>
  //               </div>
  //           )}
  //       </div>
)};
export default App;
