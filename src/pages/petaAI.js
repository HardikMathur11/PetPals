import {useState} from 'react';
export default function PetaAI(){
      const API_KEY = 'AIzaSyAybNS98kfyzBqk4xPJaeoOdqWfxYnjMNE';
      
     
      const [mess , setmess] = useState('');
      const [usermessage , setusermessage] = useState([]);
      const [botmessage , setbotmessage] = useState([]);
      const [history, setHistory] = useState([]);
      const [chat , setchat] = useState([]);

   async function sendMessage() {
  if (!mess.trim()) return;

  AdduserMessage(mess);
  setmess('');

  const userMsg = {
    role: "user",
    parts: [{ text: mess }]
  };

  // Use the latest history safely
  const updatedHistory = [...history, userMsg];

  // Update history state
  setHistory(updatedHistory);

  // Send API request
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: updatedHistory
    })
  });

  const data = await response.json();
  try {
    const botReply = data.candidates[0].content.parts[0].text;
    AddbotMessage(botReply);

    const modelMsg = {
      role: "model",
      parts: [{ text: botReply }]
    };

    // Now append model reply to history
    setHistory((prevHistory) => [...prevHistory, modelMsg]);  // ✅ correct
    
  } catch (e) {
    AddbotMessage("❌ Error getting response");
    console.error("Error parsing Gemini response:", e);
  }
}

      function AdduserMessage(mess)
      {
        setusermessage([...usermessage , mess])
        setchat((prev) => [...prev , { text: mess, sender: "user" }]);
      }
      function AddbotMessage(botReply)
      {
        setbotmessage([...botmessage , botReply])
        setchat((prev) => [...prev, { text: botReply, sender: "bot" }]);
      }
return (
  
     
    <div>
      <h2 style={{ textAlign: 'center' }}>Gemini AI Chatbot</h2>


      <div id="chat-box  ">
       { chat.map((me , index) =>
        (
            <div key={index} className ={me.sender==='user' ? 'bg-blue-500' : 'bg-green-500' }>
             {me.text}
            </div>
       )
       )
       }
        </div>
    

      <div id="input-area">
        <input type="text" id="user-input" placeholder="Ask something..." value={mess} onChange={(e) => setmess(e.target.value)} />
        <button className='border-2px rounded-2xl' onClick={sendMessage}>Send</button>
        {/* <button>Clear All</button> */}
      </div>
    </div>
)
}



