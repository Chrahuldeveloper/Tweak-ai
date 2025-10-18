import React, { SetStateAction, useState } from "react";
import { LiaTelegram } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";

interface ChatProps {
  setisToggle: React.Dispatch<SetStateAction<boolean>>;
}

const hoverHandler = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  document.querySelectorAll(".hovered-element").forEach((el) => {
    (el as HTMLElement).style.border = "";
    (el as HTMLElement).style.borderRadius = "";
    el.classList.remove("hovered-element");
  });

  const targetElement = e.target as HTMLElement;
  if (
    !targetElement ||
    !(targetElement instanceof HTMLElement) ||
    targetElement.hasAttribute("lang") ||
    targetElement.classList.contains("geist_a71539c9-module__T19VSG__variable")
  ) {
    return;
  }

  targetElement.style.border = "2px solid #00f";
  targetElement.style.borderRadius = "10px";
  targetElement.classList.add("hovered-element");

  document.removeEventListener("click", hoverHandler, true);
};

export default function Chat({ setisToggle }: ChatProps) {
  const [isSelect, setisSelect] = useState<boolean>(false);

  const handleSelectPageArea = () => {
    document.addEventListener("mouseenter", hoverHandler, true);
  };

  return (
    <div className="bg-gradient-to-r from-[#334155]  to-[#0f172a] rounded-xl">
      <div className=" flex justify-between w-[20vw] p-5 ">
        <div className=" text-white flex items-center space-x-2">
          <LiaTelegram color="white" size={20} />
          <h1>Text Editor</h1>
        </div>
        <div>
          <RxCross2
            size={20}
            color="white"
            cursor={"pointer"}
            onClick={() => {
              setisToggle(false);
            }}
          />
        </div>
      </div>
      <div className="bg-black h-[40vh] overflow-y-scroll"></div>

      <div className="bg-[#111827] p-5  space-y-3 rounded-b-xl">
        {isSelect ? (
          <button
            onClick={() => {}}
            className="w-full bg-violet-500 text-black py-2 rounded-lg"
          >
            Cancel Select
          </button>
        ) : (
          <button
            onClick={() => {
              handleSelectPageArea();
              setisSelect(true);
            }}
            className="w-full bg-white text-black py-2 rounded-lg"
          >
            Select Page
          </button>
        )}
        <div className="w-full flex items-center space-x-2 ">
          <input
            type="text"
            placeholder="Type Message"
            className="bg-[#1f2937] border-[1px] border-slate-800 text-white rounded-lg px-2 py-2 outline-none w-full"
          />
          <LiaTelegram
            size={20}
            color="white"
            className="bg-[#462a8a] p-2 w-10 h-10 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
