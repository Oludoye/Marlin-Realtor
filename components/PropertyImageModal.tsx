"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type PropertyImageModalProps = {
  src: string;
  alt?: string;
  price?: string;
  location?: string;
  width?: number;
  height?: number;
};

export default function PropertyImageModal({
  src,
  alt = "Property Image",
  price,
  location,
  width = 500,
  height = 350,
}: PropertyImageModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* ✅ Clickable Property Image */}
      <div className="relative cursor-pointer">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-xl object-cover w-full h-[220px]"
          onClick={() => setIsOpen(true)}
        />

        {/* ✅ Optional Price Badge */}
        {price && (
          <span className="absolute top-3 left-3 bg-black/80 text-white px-3 py-1 text-sm rounded">
            ₦{price}
          </span>
        )}
      </div>

      {/* ✅ Fullscreen Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow"
            >
              <X size={20} />
            </button>

            {/* ✅ Full Property Image */}
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="rounded-xl object-contain max-h-[85vh] w-full"
            />

            {/* ✅ Optional Property Info */}
            {(price || location) && (
              <div className="mt-4 text-white text-center">
                {price && <p className="text-lg font-semibold">₦{price}</p>}
                {location && (
                  <p className="text-sm opacity-80">{location}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
