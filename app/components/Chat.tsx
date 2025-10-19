import React, { SetStateAction, useEffect, useState } from "react";
import { LiaTelegram } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { FaRobot } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

interface ChatProps {
  setisToggle: React.Dispatch<SetStateAction<boolean>>;
}

export default function Chat({ setisToggle }: ChatProps) {
  const [isSelect, setisSelect] = useState<boolean>(false);
  const [selectedElements, setSelectedElements] = useState<HTMLElement[]>([]);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);

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

  return (
    <div
      id="chatUi"
      className="bg-gradient-to-r from-[#334155]  to-[#0f172a] rounded-xl"
    >
      <div className="flex justify-between w-[20vw] p-5">
        <div className="text-white flex items-center space-x-2">
          <LiaTelegram color="white" size={20} />
          <h1>Text Editor</h1>
        </div>
        <div>
          <RxCross2
            size={20}
            color="white"
            cursor={"pointer"}
            onClick={() => setisToggle(false)}
          />
        </div>
      </div>

      <div className="bg-black h-[40vh] overflow-y-scroll">
        <div className="flex flex-col ">
          {selectedElements.map((i, id) => {
            return (
              <>
                <div
                  key={id}
                  className="flex items-center space-x-3 p-3 w-full"
                >
                  <FaRobot
                    className="bg-gradient-to-r from-[#334155]  to-[#0f172a]  w-12 h-12 p-2.5 rounded-full"
                    size={20}
                    color="white"
                  />
                  <p className="bg-gradient-to-r from-[#334155]  to-[#0f172a] text-slate-100  text-sm w-80 p-5 rounded-xl">
                    {i.outerHTML.toString()}
                  </p>
                </div>
              </>
            );
          })}
        </div>

        <div className="flex flex-col ">
          {selectedElements.map((i, id) => {
            return (
              <>
                <div
                  key={id}
                  className="flex items-center space-x-3 p-3 w-full"
                >
                  <p className="bg-gradient-to-r from-[#334155]  to-[#0f172a] text-slate-100  text-sm w-80 p-5 rounded-xl">
                    {"make it like"}
                  </p>
                  <CgProfile
                    className="bg-gradient-to-r from-[#334155]  to-[#0f172a] w-12 h-12 p-2.5 rounded-full" 
                    size={20}
                    color="white"
                  />
                </div>
              </>
            );
          })}
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
