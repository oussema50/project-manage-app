import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]); // To store chat history
  const [isOpen, setIsOpen] = useState(false); // For toggling chatbot visibility
  const chatContainerRef = useRef(null); // Ref for chat container

  // Scroll to the end of the chat history
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    setHistory((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const res = await fetch("https://0be338538b3519ecde7a68e6399e18fa.serveo.net/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        const data = await res.json();
        setHistory((prev) => [...prev, { sender: "bot", text: data.answer }]);
      } else {
        setHistory((prev) => [
          ...prev,
          { sender: "bot", text: "Error: Something went wrong." },
        ]);
      }
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to reach server." },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        💬
      </button>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-lg p-4 mt-2">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-lg font-bold text-gray-700">Chatbot</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
          </div>

          {/* Chat History */}
          <div
            ref={chatContainerRef}
            className="h-60 overflow-y-auto mt-4 bg-gray-50 p-2 rounded-lg"
          >
            {history.map((entry, index) => (
              <div
                key={index}
                className={`flex ${
                  entry.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`${
                    entry.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  } p-2 rounded-lg max-w-xs`}
                >
                  {entry.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex mt-4">
            <input
              type="text"
              value={message}
              onChange={handleChange}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;