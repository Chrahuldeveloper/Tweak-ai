"use client";
import { LiaTelegram } from "react-icons/lia";
import Chat from "./Chat";
import { useState } from "react";

export default function PageIcon() {
  const [isToggle, setisToggle] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-7 ">
        {isToggle && (
          <div className="animate-slideUp">
            <Chat setisToggle={setisToggle} />
          </div>
        )}
        <LiaTelegram
          onClick={() => {
            setisToggle(true);
          }}
          size={20}
          color="white"
          className={` ${
            isToggle ? "hidden" : "block"
          }  bg-gradient-to-r from-[#334155]  to-[#0f172a]  w-12 h-12 p-2.5 rounded-full`}
          cursor={"pointer"}
        />
      </div>
    </>
  );
}
