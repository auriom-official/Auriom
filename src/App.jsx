import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import TopHeader from './components/TopHeader';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Account from './pages/Account';
import Address from './pages/Address';
import Payment from './pages/Payment';
import OrderConfirmed from './pages/OrderConfirmed';
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import TrackOrder from './pages/TrackOrder';
import Warranty from './pages/Warranty';
import ReturnPolicy from './pages/ReturnPolicy';
import ServiceCenters from './pages/ServiceCenters';
import News from './pages/News';
import Blog from './pages/Blog';
import CorporateGifting from './pages/CorporateGifting';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NoRefundPolicy from './pages/NoRefundPolicy';
import { CartProvider } from './context/CartContext';
import Chatbot from './components/Chatbot';
import './App.css';

const ConditionalFooter = () => {
  const location = useLocation();
  const hiddenRoutes = ['/signin', '/signup', '/login', '/cart', '/account', '/orders', '/shop', '/checkout/address', '/checkout/payment', '/checkout/success'];
  if (hiddenRoutes.includes(location.pathname)) return null;
  return <Footer />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <TopHeader />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout/address" element={<Address />} />
            <Route path="/checkout/payment" element={<Payment />} />
            <Route path="/checkout/success" element={<OrderConfirmed />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/service-centers" element={<ServiceCenters />} />
            <Route path="/news" element={<News />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/corporate-gifting" element={<CorporateGifting />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/no-refund-policy" element={<NoRefundPolicy />} />
          </Routes>
          <ConditionalFooter />
          <Chatbot />
          <BottomNav />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
