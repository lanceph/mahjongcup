import React, { useState } from "react";

export interface RuleSection {
  id: string;
  title: string;
  content: React.ReactNode;
  imageUrl?: string;
}

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  rulesData: RuleSection[];
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  rulesData,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!isOpen) return null;

  const currentRule = rulesData[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#fffaf0] to-[#fcedd8] p-6 md:p-8 rounded-2xl border-4 border-[#dcb562] text-[#4a2b16] max-w-5xl w-full relative shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-4xl text-[#dcb562] hover:text-[#4a2b16] transition-all z-10"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl md:text-3xl font-black mb-4 text-center border-b-2 border-[#dcb562] pb-2 flex-shrink-0">
          賽事規則說明
        </h2>

        {/* 頁籤導覽列 */}
        <div className="flex overflow-x-auto gap-2 mb-4 custom-scrollbar p-2 flex-shrink-0 items-center">
          {rulesData.map((rule, index) => (
            <button
              key={rule.id}
              onClick={() => setActiveIndex(index)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-bold transition-all border-2 flex-shrink-0 ${
                activeIndex === index
                  ? "bg-[#dcb562] text-white border-[#dcb562] shadow-md"
                  : "bg-transparent text-[#dcb562] border-[#dcb562] hover:bg-[#dcb562]/20"
              }`}
            >
              {rule.title}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 flex flex-col md:flex-row gap-6">
          {currentRule.imageUrl && (
            <div className="w-full md:w-2/5 flex-shrink-0">
              <img
                src={currentRule.imageUrl}
                alt={currentRule.title}
                className="w-full h-auto object-cover rounded-lg border-2 border-[#dcb562]/50 shadow-sm"
              />
            </div>
          )}

          <div
            className={`w-full ${
              currentRule.imageUrl ? "md:w-3/5 flex-grow" : "flex-grow"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#5c3a21] border-l-4 border-[#dcb562] pl-3">
              {currentRule.title}
            </h3>
            <div className="text-base md:text-lg text-[#5c3a21] leading-relaxed font-medium">
              {currentRule.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
