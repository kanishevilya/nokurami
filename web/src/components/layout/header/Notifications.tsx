"use client";

import { useState } from "react";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-muted rounded-full transition-colors relative"
      >
        <svg
          className="h-6 w-6 text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
          3
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover rounded-[var(--radius)] shadow-xl py-2 border border-border animate-fadeIn">
          <div className="px-4 py-2 text-popover-foreground border-b border-border">
            Notifications
          </div>
          <div className="max-h-64 overflow-y-auto">
            <div className="px-4 py-2 text-popover-foreground hover:bg-muted transition-colors">
              New message received
            </div>
            <div className="px-4 py-2 text-popover-foreground hover:bg-muted transition-colors">
              Friend request
            </div>
            <div className="px-4 py-2 text-popover-foreground hover:bg-muted transition-colors">
              Post liked
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
