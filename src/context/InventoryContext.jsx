import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient'; 

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [salesRecords, setSalesRecords] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]); 
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => localStorage.getItem('isAdminLoggedIn') === 'true');

  useEffect(() => { fetchInventory(); fetchSalesRecords(); }, []);

  const fetchInventory = async () => {
    const { data } = await supabase.from('products').select('*');
    if (data) setInventory(data);
  };

  const addItem = async (item) => {
    const { data } = await supabase.from('products').insert([item]).select();
    if (data?.[0]) setInventory(p => [...p, data[0]]);
  };

  const updateItem = async (item) => {
    const numId = parseInt(item.id, 10);
    const { error } = await supabase.from('products').update({ name: item.name, category: item.category, price: parseFloat(item.price), icon: item.icon }).eq('id', numId);
    if (!error) setInventory(p => p.map(i => i.id === numId ? item : i));
  };

  const deleteItem = async (id) => {
    const numId = parseInt(id, 10);
    const { error } = await supabase.from('products').delete().eq('id', numId);
    if (!error) setInventory(p => p.filter(i => i.id !== numId));
  };

  const addToCart = (item) => {
    setCart(p => p.find(i => i.id === item.id) ? p.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) : [...p, { ...item, quantity: 1 }]);
  };

  const updateCartQuantity = (id, amt) => {
    setCart(p => p.map(i => i.id === id ? (i.quantity + amt > 0 ? { ...i, quantity: i.quantity + amt } : null) : i).filter(Boolean));
  };

  const removeFromCart = (id) => setCart(p => p.filter(i => i.id !== id));

  const fetchSalesRecords = async () => {
    const { data } = await supabase.from('sales').select('*').order('created_at', { ascending: false });
    if (data) setSalesRecords(data);
  };

  // UPDATED: Accepts an optional callback to close the drawer layout panel instantly on successful sale
  const processCheckout = async (amt, onSuccessCallback) => {
    if (!cart.length) return alert("Your cart is empty!");
    const { data } = await supabase.from('sales').insert([{ amount: parseFloat(amt), items_count: cart.reduce((s, i) => s + i.quantity, 0) }]).select();
    if (data?.[0]) { 
      setSalesRecords(p => [data[0], ...p]); 
      setCart([]); 
      alert("Success!"); 
      if (onSuccessCallback) onSuccessCallback(); // Dispatches immediate window toggle
    }
  };

  const loginAdmin = async (user, pass) => {
    const { data } = await supabase.from('admin_auth').select('*').eq('username', user.trim()).eq('password', pass);
    if (data?.length) { setIsAdminLoggedIn(true); localStorage.setItem('isAdminLoggedIn', 'true'); return true; }
    return false;
  };

  const logoutAdmin = () => { setIsAdminLoggedIn(false); localStorage.removeItem('isAdminLoggedIn'); };

  const changeAdminPassword = async (user, pass) => {
    const { error } = await supabase.from('admin_auth').update({ username: user.trim() || 'admin', password: pass }).eq('id', 1);
    if (!error) { alert("Credentials updated!"); return true; }
    return false;
  };

  // Live query list calculator loop for text searches
  const filteredInventory = useMemo(() => {
    if (!searchQuery.trim()) return inventory;
    const query = searchQuery.toLowerCase().trim();
    return inventory.filter(item => 
      item.name?.toLowerCase().includes(query) || 
      item.category?.toLowerCase().includes(query)
    );
  }, [inventory, searchQuery]);

  return (
    <InventoryContext.Provider value={{ 
      inventory, filteredInventory, salesRecords, salesTotal: salesRecords.reduce((s, r) => s + parseFloat(r.amount || 0), 0), searchQuery, setSearchQuery, 
      addItem, updateItem, deleteItem, addToCart, cart, updateCartQuantity, removeFromCart, processCheckout,
      isAdminLoggedIn, loginAdmin, logoutAdmin, changeAdminPassword 
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
