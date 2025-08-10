import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useStore from "../store.js";

const DeleteModal = ({ urlId }) => {
  const { deleteUrl, fetchUrl } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  // Open modal handler
  const openModal = () => setIsOpen(true);

  // Close modal handler
  const closeModal = () => setIsOpen(false);

  // Close on Escape key press
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleDelete = (id) => {
    deleteUrl(id);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center m-2">
          {/* Overlay */}
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Modal */}
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative z-10 w-full max-w-md  bg-white rounded-2xl shadow-2xl border border-blue-200 p-8 flex flex-col items-center outline-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            style={{ boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)" }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition outline-none"
              aria-label="Close"
              tabIndex={0}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center w-full mx-2">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-red-50 mb-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="h-10 w-10 text-red-500"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#F87171"
                    strokeWidth="1.5"
                    fill="#FEE2E2"
                  />
                  <path
                    d="M12 8v4"
                    stroke="#F87171"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1" fill="#F87171" />
                </svg>
              </div>
              <h3
                id="dialog-title"
                className="text-2xl font-extrabold text-zinc-900 mb-2 text-center"
              >
                Delete Item
              </h3>
              <p className="text-base text-gray-600 text-center mb-2 max-w-[340px]">
                Are you sure you want to delete this item?
                <div className="font-semibold underline underline-offset-2 text-gray-700">
                  This action cannot be undone
                </div>
                .
              </p>
            </div>
            <div className="flex gap-4 w-full mt-2">
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  deleteUrl(urlId).then(() => fetchUrl());
                  toast.success("URL deleted successfully");
                }}
                className="flex-1 rounded-xl bg-red-600 px-0 py-3 text-lg font-semibold text-white shadow hover:bg-red-700 transition"
                style={{ minWidth: 0 }}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => {
                  closeModal();
                }}
                className="flex-1 rounded-xl bg-gray-100 px-0 py-3 text-lg font-semibold text-zinc-800 shadow hover:bg-gray-200 transition"
                style={{ minWidth: 0 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
