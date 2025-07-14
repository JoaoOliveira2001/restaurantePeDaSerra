import { useState, useCallback, useMemo } from 'react';

export default function useCart() {
  const [items, setItems] = useState([]);

  const addItem = useCallback((item, qty = 1, notes = '') => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...item, qty, notes }];
    });
  }, []);

  const updateItem = useCallback((id, qty, notes) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty, notes } : i));
  }, []);

  const removeItem = useCallback(id => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }, [items]);

  return { items, addItem, updateItem, removeItem, total };
}
