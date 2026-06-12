import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';
import './Chatbot.css';

const faqs = [
  "Where is my order?",
  "What is the return policy?",
  "Are there any ongoing sales?",
  "How to claim warranty?",
  "How do I cancel my order?",
  "What payment methods are accepted?",
  "Any other query"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm CHETTA. How can I help you today?", isBot: true },
    { type: 'options', options: faqs, isBot: true }
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
    
    // Remove the options block to make the chat feel progressive
    setMessages(prev => prev.filter(m => m.type !== 'options'));
    
    // Add user's selected text
    setMessages(prev => [...prev, { text, isBot: false }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I'm sorry, I'm just a simple bot. Please contact support for more details.";
      if (text === "Any other query") reply = "For any other queries or custom support, please reach out to our team directly via email at support@auriom.in or use the Contact page.";
      else if (text.toLowerCase().includes("order") && !text.toLowerCase().includes("cancel")) reply = "You can track your order in the 'Orders' section of your account.";
      else if (text.toLowerCase().includes("return")) reply = "Our return policy allows returns within 2 days of delivery. Check the Return Policy page for details.";
      else if (text.toLowerCase().includes("sales")) reply = "Check out our 'New Launches' and 'Bestsellers' sections for the latest discounts!";
      else if (text.toLowerCase().includes("warranty")) reply = "Our products come with warranty as per our warranty policy. Check the Warranty page for details.";
      else if (text.toLowerCase().includes("cancel")) reply = "You can cancel your order within 24 hours of placing it from the 'Orders' section in your account.";
      else if (text.toLowerCase().includes("payment")) reply = "We accept all major credit/debit cards, UPI, and Net Banking. COD not available.";
      
      // Send bot reply and show options again
      setMessages(prev => [
        ...prev, 
        { text: reply, isBot: true },
        { type: 'options', options: faqs, isBot: true }
      ]);
      setIsTyping(false);
    }, 2000); // 2 second response
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
            {messages.map((msg, idx) => {
              if (msg.type === 'options') {
                return (
                  <div key={idx} className="chat-options-container">
                    <p className="chat-options-title">Frequently Asked:</p>
                    <div className="chat-options-grid">
                      {msg.options.map((opt, i) => (
                        <button key={i} className="chat-option-btn" onClick={() => handleSend(opt)} disabled={isTyping}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className={`chat-message ${msg.isBot ? 'bot' : 'user'}`}>
                  {msg.text}
                </div>
              );
            })}
            {isTyping && (
              <div className="chat-message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
