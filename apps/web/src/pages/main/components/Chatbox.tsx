import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState<object[]>([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    try {
        setIsLoading(true)
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: input },
      ]);
      const { data } = await axios.get("http://127.0.0.1:8001/", {
        params: { arg: input },
      });
      setInput("")
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: data.sender, text: data.text[0].generated_text },
      ]);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setInput("")

      throw new Error("Failed to fetch data");
    }
  };
  const messagesContainerRef = useRef();

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages, isLoading]);

  return (
    <div className="fixed right-0 bottom-0 m-6 max-w-xs w-full bg-sidebar rounded-lg">
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-2 p-2">
        <div className="flex items-center space-x-2">
          <img
            src="https://utfs.io/f/11c3fb85-c194-4b16-99c2-66ce1744902a-5482fr.jfif"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-white">Your Name</span>
        </div>
        <button
          onClick={() => {}}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      {/* Chat Messages */}
      <div ref={messagesContainerRef} className="bg-secondary text-white p-3 rounded-t-lg h-[400px] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${message.sender === "user" ? "text-right" : ""} pb-2`}
          >
            <p className="inline-block p-2 rounded-lg bg-document_bg text-gray-200">
              {message.text}
            </p>
          </div>
        ))}
        {isLoading && (<div
           className="p-2"
          >
            <p className="flex gap-3">
            <Skeleton  className="h-4 w-4 rounded-full bg-gray-400" />
            <Skeleton className="h-4 w-4 rounded-full bg-gray-500" />
            <Skeleton className="h-4 w-4 rounded-full bg-gray-700" />
   
            </p>
          </div>)}
      </div>

      {/* Chat Input */}
      <div className="p-3 rounded-b-lg">
        <div className="flex gap-2">
          <Input placeholder="start the story..." value={input} onChange={(e) => setInput(e.target.value)} />
          <Button
            type="submit"
            variant={"default"}
            size={"sm"}
            onClick={sendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
