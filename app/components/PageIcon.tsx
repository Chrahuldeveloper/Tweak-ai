"use client";
import { useRef, useState } from "react";
import Chat from "./Chat";

export default function PageIcon() {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const chat = chatRef.current;
    if (!chat) {
      return;
    }

    const box = chat.getBoundingClientRect();
    const offsetX = e.clientX - box.left;
    const offsetY = e.clientY - box.top;

    const handleMouseMove = (e: MouseEvent) => {
      setIsDragging(false);
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className=" w-full h-screen p-5">
      <div className="max-w-lg p-5 rounded-xl border-[1px] border-slate-300 ">
        <div>
          <h1 className="text-xl font-bold mb-2">Icon</h1>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            perferendis voluptatibus, corrupti iure facilis nam blanditiis
            recusandae nemo perspiciatis reprehenderit modi vel amet suscipit!
            Aliquam aperiam consectetur consequuntur quae ex.
          </p>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">Toggle:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isToggled}
                onChange={() => setIsToggled(!isToggled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-all duration-300"></div>
              <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
            </label>
          </div>
        </div>
      </div>

      {isToggled ? (
        <div
          ref={chatRef}
          id="chatUi"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className={`fixed w-14 h-14 rounded-full bg-blue-500 cursor-grab active:cursor-grabbing shadow-lg transition-transform ${
            isDragging ? "scale-105" : "scale-100"
          }`}
          onMouseDown={handleMouseDown}
        >
          <Chat />
        </div>
      ) : null}
    </div>
  );
}
