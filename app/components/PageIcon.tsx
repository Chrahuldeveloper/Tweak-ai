import { LiaTelegram } from "react-icons/lia";
import Chat from "./Chat";

export default function PageIcon() {
  return (
    <>
      <div className="fixed bottom-5 right-7 flex flex-col justify-center items-center">
        <Chat />
        <LiaTelegram
          size={20}
          color="white"
          className="bg-gradient-to-r from-[#334155]  to-[#0f172a]  w-12 h-12 p-2.5 rounded-full"
          cursor={"pointer"}
        />
      </div>
    </>
  );
}
