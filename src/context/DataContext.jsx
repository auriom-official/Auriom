import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';
import mockProducts from '../data/products';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(mockProducts);
  const [categories, setCategories] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auriom_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('auriom_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auriom_user');
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, couponsRes, bannersRes] = await Promise.all([
        supabase.from('products').select('*').order('id'),
        supabase.from('categories').select('*').order('id'),
        supabase.from('coupons').select('*').eq('status', 'Active'),
        supabase.from('banners').select('*').order('id')
      ]);

      if (productsRes.data && productsRes.data.length > 0) {
        const mappedProducts = productsRes.data.map(p => ({
          ...p,
          originalPrice: p.original_price ? parseFloat(p.original_price) : 0,
          price: p.price ? parseFloat(p.price) : 0,
          reviews: p.reviews ? parseInt(p.reviews, 10) : 0,
          rating: p.rating ? parseFloat(p.rating) : 0,
          discount: p.discount ? parseInt(p.discount, 10) : 0,
          inStock: p.in_stock !== undefined ? p.in_stock : true,
          img2: p.img2 || null,
          img3: p.img3 || null,
          img4: p.img4 || null,
          tags: Array.isArray(p.tags) ? p.tags : [],
        }));
        setProducts(mappedProducts);
      }
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (couponsRes.data) setCoupons(couponsRes.data);
      if (bannersRes.data) setBanners(bannersRes.data);
    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();
      
    if (error) {
      throw new Error('Login failed: ' + error.message);
    }
    if (!data) {
      throw new Error('Invalid email or password');
    }
    if (data.status && data.status !== 'Active') {
      throw new Error('Account is inactive. Please contact support.');
    }
    setUser(data);
    return data;
  };

  const signup = async (firstName, lastName, email, phone, password) => {
    const { data: existing } = await supabase.from('users').select('id').eq('email', email).maybeSingle();
    if (existing) {
      throw new Error('Email already exists. Please login.');
    }

    const { data, error } = await supabase.from('users').insert([{
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      password,
      role: 'Customer',
      status: 'Active',
      is_admin: false,
      addresses: []
    }]).select().single();

    if (error) throw new Error(error.message);
    setUser(data);
    return data;
  };

  const logout = () => setUser(null);

  const updateUserProfile = async (updates) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    setUser(data);
    return data;
  };

  const addAddress = async (newAddress) => {
    if (!user) return;
    const addresses = user.addresses || [];
    // Give address a unique ID
    newAddress.id = Date.now().toString();
    const updatedAddresses = [...addresses, newAddress];
    
    const { data, error } = await supabase
      .from('users')
      .update({ addresses: updatedAddresses })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    setUser(data);
    return data;
  };

  const deleteAddress = async (addressId) => {
    if (!user) return;
    const updatedAddresses = (user.addresses || []).filter(a => a.id !== addressId);
    
    const { data, error } = await supabase
      .from('users')
      .update({ addresses: updatedAddresses })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    setUser(data);
    return data;
  };

  const createOrder = async (orderData, paymentData) => {
    const { data: orderRes, error: orderErr } = await supabase.from('orders').insert([orderData]).select().single();
    if (orderErr) throw new Error(orderErr.message);

    if (paymentData) {
      const { error: payErr } = await supabase.from('payments').insert([{
        ...paymentData,
        order_id: orderRes.id
      }]);
      if (payErr) console.error("Payment logging failed:", payErr);
    }
    return orderRes;
  };

  return (
    <DataContext.Provider value={{
      products, categories, coupons, banners, loading,
      user, login, signup, logout, updateUserProfile, addAddress, deleteAddress, createOrder
    }}>
      {children}
    </DataContext.Provider>
  );
};
