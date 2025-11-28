"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function MobileNav({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Only add listener when menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle menu close on link click
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative z-50"
      >
        {isOpen ? (
          <XMarkIcon className="h-8 w-8" />
        ) : (
          <Bars3Icon className="h-8 w-8" />
        )}
      </button>

      <ul
        className={`absolute right-0 top-10 mt-4 bg-primary-950 border border-primary-800 rounded-lg shadow-xl overflow-hidden transition-all w-48 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <li>
          <Link
            href="/cabins"
            onClick={handleLinkClick}
            className="block px-6 py-4 hover:bg-primary-900 hover:text-accent-400 transition-colors border-b border-primary-800"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            onClick={handleLinkClick}
            className="block px-6 py-4 hover:bg-primary-900 hover:text-accent-400 transition-colors border-b border-primary-800"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            onClick={handleLinkClick}
            className="block px-6 py-4 hover:bg-primary-900 hover:text-accent-400 transition-colors"
          >
            {session?.user?.image ? (
              <span className="flex items-center gap-3">
                <img
                  className="h-8 rounded-full"
                  alt={session.user.name || "User"}
                  src={session.user.image}
                  referrerPolicy="no-referrer"
                />
                <span>Guest area</span>
              </span>
            ) : (
              "Guest area"
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}
