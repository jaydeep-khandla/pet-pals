import React from 'react';

const ChatBot = () => {
  return (
    <div className='h-full w-full flex items-center'>
      <iframe
        src="http://localhost:8501" // Replace with your Streamlit app URL
        style={{ border: 'none', width: '100%', height: '100%' }}
        title="Streamlit App"
      ></iframe>
    </div>
  );
};

export default ChatBot;