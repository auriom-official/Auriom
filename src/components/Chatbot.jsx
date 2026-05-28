import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';
import './Chatbot.css';

const faqs = [
  "Where is my order?",
  "What is the return policy?",
  "How to contact support?",
  "Are there any ongoing sales?",
  "How to claim warranty?",
  "Do you offer international shipping?",
  "How do I cancel my order?",
  "What payment methods are accepted?"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm CHETTA. How can I help you today?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text) return;
    setMessages(prev => [...prev, { text, isBot: false }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I'm sorry, I'm just a simple bot. Please contact support for more details.";
      if (text.toLowerCase().includes("order") && !text.toLowerCase().includes("cancel")) reply = "You can track your order in the 'Orders' section of your account.";
      else if (text.toLowerCase().includes("return")) reply = "Our return policy allows returns within 7 days of delivery. Check the Return Policy page for details.";
      else if (text.toLowerCase().includes("support")) reply = "You can reach us at support@auriom.com or via the Contact page.";
      else if (text.toLowerCase().includes("sales")) reply = "Check out our 'Big Deals' section for the latest discounts!";
      else if (text.toLowerCase().includes("warranty")) reply = "All our products come with a 1-year warranty. Visit the Warranty page to register your product or claim a replacement.";
      else if (text.toLowerCase().includes("international") || text.toLowerCase().includes("shipping")) reply = "Currently, we only ship within India. Stay tuned as we expand!";
      else if (text.toLowerCase().includes("cancel")) reply = "You can cancel your order within 24 hours of placing it from the 'Orders' section in your account.";
      else if (text.toLowerCase().includes("payment")) reply = "We accept all major credit/debit cards, UPI, Net Banking, and Cash on Delivery (COD).";
      
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
      setIsTyping(false);
    }, 3500); // 3.5 seconds slow response
  };

  return (
    <>
      <button className="chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="fab-text">CHETTA</span>}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>CHETTA BOT</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-faqs">
            <p>Frequently Asked:</p>
            <div className="faq-chips">
              {faqs.map((faq, idx) => (
                <button key={idx} onClick={() => handleSend(faq)} disabled={isTyping}>
                  {faq}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
