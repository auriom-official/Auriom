import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page py-section container" style={{minHeight: '70vh', paddingTop: '100px'}}>
      <h2 className="section-title text-center">Contact Us</h2>
      <div style={{maxWidth: '600px', margin: '0 auto', marginTop: '40px'}}>
        <div style={{background: 'var(--bg-pure)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)'}}>
          <p style={{marginBottom: '10px'}}><strong>Email:</strong> support@auriom.in</p>
          <p style={{marginBottom: '10px'}}><strong>Phone:</strong> 1800-123-4567</p>
          <p style={{marginBottom: '30px'}}><strong>Address:</strong> Doomdooma Tinsukia Assam 786151</p>
          
          <form style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <input type="text" placeholder="Your Name" style={{padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px'}} required />
            <input type="email" placeholder="Your Email" style={{padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px'}} required />
            <textarea placeholder="Your Message" rows="5" style={{padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', resize: 'vertical'}} required></textarea>
            <button className="btn btn-primary" style={{marginTop: '10px'}}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
