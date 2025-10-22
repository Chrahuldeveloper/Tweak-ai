import React, { useEffect, useState } from "react";
import { LiaTelegram } from "react-icons/lia";
import { FaRobot } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

interface ChatMessage {
  sender: "user" | "bot";
  content: string;
}

export default function Chat() {
  const [isSelect, setisSelect] = useState<boolean>(false);
  const [selectedElements, setSelectedElements] = useState<HTMLElement[]>([]);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const insertElementIntoDom = (
    oldCode: HTMLElement,
    newCode: string | HTMLElement | null
  ) => {
    if (!oldCode || !newCode) return;

    let newEl: HTMLElement | null = null;
    if (typeof newCode === "string") {
      const temp = document.createElement("div");
      temp.innerHTML = newCode.trim();
      newEl = temp.firstElementChild as HTMLElement | null;
    } else if (newCode instanceof HTMLElement) {
      newEl = newCode;
    }
    if (!newEl) {
      console.error("No valid element created from newCode.");
      return;
    }
    oldCode.replaceWith(newEl);
  };

  const hoverHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      !target ||
      target.hasAttribute("lang") ||
      target.classList.contains("geist_a71539c9-module__T19VSG__variable") ||
      target.closest("#chatUi")
    ) {
      return;
    }

    if (hoveredEl && !selectedElements.includes(hoveredEl)) {
      hoveredEl.style.border = "";
      hoveredEl.style.borderRadius = "";
    }

    if (!selectedElements.includes(target)) {
      target.style.border = "2px solid #00f";
      target.style.borderRadius = "10px";
      setHoveredEl(target);
    }

    console.log(target);
    console.log(selectedElements);

    const removeHover = () => {
      if (!selectedElements.includes(target)) {
        target.style.border = "";
        target.style.borderRadius = "";
      }
      target.removeEventListener("mouseout", removeHover);
    };

    target.addEventListener("mouseout", removeHover);
    setHoveredEl(null);
  };

  const clickHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      !target ||
      target.hasAttribute("lang") ||
      target.classList.contains("geist_a71539c9-module__T19VSG__variable") ||
      target.closest("#chatUi")
    )
      return;

    if (!selectedElements.includes(target)) {
      target.style.border = "2px solid red";
      target.style.borderRadius = "10px";
      setSelectedElements((prev) => [...prev, target]);

      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", content: target.outerHTML.toString() },
      ]);
    }
  };

  const handleSelectPageArea = () => {
    document.addEventListener("mouseover", hoverHandler, true);
    document.addEventListener("click", clickHandler, true);
    setisSelect(true);
  };

  const handleRemoveEventListener = () => {
    document.removeEventListener("mouseover", hoverHandler, true);
    document.removeEventListener("click", clickHandler, true);

    if (hoveredEl) {
      hoveredEl.style.border = "";
      hoveredEl.style.borderRadius = "";
    }
    selectedElements.forEach((el) => {
      el.style.border = "";
      el.style.borderRadius = "";
    });

    setHoveredEl(null);
    setSelectedElements([]);
    setisSelect(false);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mouseover", hoverHandler, true);
      document.removeEventListener("click", clickHandler, true);
    };
  }, []);

  const handleSendRequest = async () => {
    setInputMessage("");
    if (selectedElements.length === 0 || !inputMessage.trim()) return;

    const selectedEl = selectedElements[selectedElements.length - 1];

    const userMsg: ChatMessage = {
      sender: "user",
      content: inputMessage,
    };

    setChatHistory((prev) => [...prev, userMsg]);
    const req = { message: inputMessage, code: selectedEl.outerHTML };

    try {
      setIsLoading(true);
      const sendReq = await fetch(
        "https://tweakai.chrahulofficial.workers.dev",
        {
          method: "POST",
          body: JSON.stringify(req),
        }
      );

      const data = await sendReq.json();
      setIsLoading(false);

      const botMsg: ChatMessage = {
        sender: "bot",
        content: data?.response || selectedEl.outerHTML.toString(),
      };

      setChatHistory((prev) => [...prev, botMsg]);
      insertElementIntoDom(selectedEl, botMsg.content);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    setInputMessage("");
  };

  return (
    <div
      id="chatUi"
      className="bg-gradient-to-r from-[#334155] to-[#0f172a] w-96 rounded-xl"
    >
      <div className="flex justify-between p-5">
        <div className="text-white flex items-center space-x-2">
          <LiaTelegram color="white" size={20} />
          <h1>Text Editor</h1>
        </div>
      </div>

      <div className="bg-black h-[40vh] overflow-y-scroll">
        <div className="flex flex-col space-y-3 p-3">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 w-full ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <FaRobot
                  color="white"
                  className="bg-gradient-to-r from-[#334155] to-[#0f172a] w-12 h-12 p-2.5 rounded-full"
                />
              )}
              <p
                className={`bg-gradient-to-r from-[#334155] to-[#0f172a] text-slate-100 text-sm p-4 rounded-xl max-w-[75%] break-words ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {msg.content}
              </p>
              {msg.sender === "user" && (
                <CgProfile
                  color="white"
                  className="bg-gradient-to-r from-[#334155] to-[#0f172a] w-12 h-12 p-2.5 rounded-full"
                />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3">
              <FaRobot className="bg-gradient-to-r from-[#334155] to-[#0f172a] w-12 h-12 p-2.5 rounded-full" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#111827] p-5 space-y-3 rounded-b-xl">
        {isSelect ? (
          <button
            onClick={handleRemoveEventListener}
            className="w-full bg-violet-500 text-black py-2 rounded-lg"
          >
            Cancel Select
          </button>
        ) : (
          <button
            onClick={handleSelectPageArea}
            className="w-full bg-white text-black py-2 rounded-lg"
          >
            Select Page
          </button>
        )}

        <div className="w-full flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type Message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="bg-[#1f2937] border border-slate-800 text-white rounded-lg px-2 py-2 outline-none w-full"
          />
          <LiaTelegram
            onClick={handleSendRequest}
            size={20}
            color="white"
            className={`${
              isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } bg-[#462a8a] p-2 w-10 h-10 rounded-xl`}
          />
        </div>
      </div>
    </div>
  );
}
