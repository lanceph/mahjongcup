import React from "react";

interface StandardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const StandardModal: React.FC<StandardModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#fffaf0] to-[#fcedd8] p-8 md:p-10 rounded-2xl border-4 border-[#dcb562] text-[#4a2b16] max-w-2xl w-[90%] relative shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-5 text-4xl text-[#dcb562] hover:text-[#4a2b16] transition-all"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-3xl md:text-4xl font-black mb-6 text-center border-b-2 border-[#dcb562] pb-4">
          {title}
        </h2>
        <div className="text-lg md:text-xl text-[#5c3a21] leading-relaxed max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 whitespace-pre-wrap font-medium">
          {content}
        </div>
      </div>
    </div>
  );
};
