import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';

export default function CategoryView({ title, category }) {
  const { inventory, addItem, updateItem, deleteItem, salesTotal } = useInventory();

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newIcon, setNewIcon] = useState('📦');
  const [newCategory, setNewCategory] = useState(category === 'All' ? 'Food & Drinks' : category);

  useEffect(() => { 
    setNewCategory(category === 'All' ? 'Food & Drinks' : category); 
  }, [category]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  // Strict sorting evaluation layer
  const filteredItems = category === 'All' 
    ? inventory 
    : inventory.filter(item => item.category === category);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return alert("Please fill out all product parameters.");
    
    // Let Supabase assign IDs sequentially on its own
    await addItem({ 
      name: newName, 
      category: newCategory, 
      price: parseFloat(newPrice), 
      icon: newIcon 
    });
    
    setNewName(''); 
    setNewPrice(''); 
    setNewIcon('📦');
  };

  const startEdit = (item) => {
    setEditingId(item.id); 
    setEditName(item.name); 
    setEditPrice(item.price.toString());
  };

  const handleSaveUpdate = async (id, baseItem) => {
    if (!editName || !editPrice) return;
    await updateItem({ ...baseItem, id, name: editName, price: parseFloat(editPrice) });
    setEditingId(null);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 20px 0', fontWeight: '700' }}>{title} Stock Manager</h2>

      <div style={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px' }}>💰 Total Store Revenue</span>
        <h3 style={{ margin: 0, fontSize: '28px', color: '#38bdf8', fontWeight: '800' }}>${(salesTotal || 0).toFixed(2)}</h3>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#475569' }}>➕ Inject New Product Line</h4>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <input type="text" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', flex: '1 1 140px' }} />
          <input type="number" step="0.01" placeholder="Price" value={newPrice} onChange={e => setNewPrice(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', flex: '1 1 100px' }} />
          <input type="text" placeholder="Emoji" value={newIcon} onChange={e => setNewIcon(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', flex: '1 1 60px', maxWidth: '80px' }} />
          <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Groceries">Groceries</option>
          </select>
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Save</button>
        </form>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflowX: 'auto', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Item</th>
              <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Category</th>
              <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Price</th>
              <th style={{ padding: '12px', fontSize: '13px', color: '#64748b', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                  No items listed. Verify that category text options match your dashboard inputs!
                </td>
              </tr>
            ) : (
              filteredItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    {item.icon} {editingId === item.id ? <input value={editName} onChange={e => setEditName(e.target.value)} style={{ padding: '4px', width: '100px' }} /> : <strong>{item.name}</strong>}
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px' }}>
                    <span style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{item.category}</span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#16a34a' }}>
                    {editingId === item.id ? <input type="number" step="0.01" value={editPrice} onChange={e => setEditPrice(e.target.value)} style={{ padding: '4px', width: '60px' }} /> : `$${(parseFloat(item.price) || 0).toFixed(2)}`}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    {editingId === item.id ? (
                      <>
                        <button onClick={() => handleSaveUpdate(item.id, item)} style={{ padding: '4px 8px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', marginRight: '4px', cursor: 'pointer' }}>Ok</button>
                        <button onClick={() => setEditingId(null)} style={{ padding: '4px 8px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>X</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(item)} style={{ padding: '4px 8px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', marginRight: '4px', cursor: 'pointer' }}>✏️</button>
                        <button onClick={() => deleteItem(item.id)} style={{ padding: '4px 8px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
