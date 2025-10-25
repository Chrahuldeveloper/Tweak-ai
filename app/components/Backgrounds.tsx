import React from "react";

interface BackgroundsProps {
  setChatBg: React.Dispatch<React.SetStateAction<string>>;
}

export default function Backgrounds({ setChatBg }: BackgroundsProps) {
  const imagesLinks = [
    "https://images.unsplash.com/photo-1761165308297-6aa2e5fb8fe7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
    "https://plus.unsplash.com/premium_photo-1761167847292-89302a349aea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=685",
    "https://images.unsplash.com/photo-1761165308297-6aa2e5fb8fe7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
    "https://plus.unsplash.com/premium_photo-1761167847292-89302a349aea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=685",
  ];

  return (
    <div className=" grid grid-cols-2 gap-4 p-5 h-[65vh] overflow-y-scroll">
      {imagesLinks.map((i, id) => {
        return (
          <div key={id}>
            <div className="">
              <img
                src={i}
                onClick={() => {
                  setChatBg(i);
                }}
                className="rounded-lg cursor-pointer"
                alt={i}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
