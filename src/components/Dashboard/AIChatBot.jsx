import React, { useState } from 'react';

const AIChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    // Inga thaan Gemini API call varum
    setInput('');
  };

  return (
    <div className="glass-panel" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ color: 'white' }}> AI Assistant 🤖</h3>
      <div className="chat-box" style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', color: 'white' }}>
            <p style={{ background: '#333', padding: '10px', borderRadius: '10px', display: 'inline-block' }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, padding: '10px', borderRadius: '5px' }} 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a doubt..." 
        />
        <button onClick={handleSend} style={{ padding: '10px 20px' }}>Send</button>
      </div>
    </div>
  );
};

export default AIChatBot;