import React, { useState } from 'react';
import AnimatedList from '@/components/ui/AnimatedList';
import { X } from 'lucide-react';

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: string[];
  onSelect: (item: string, index: number) => void;
  placeholder?: string;
  maxHeight?: string;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  isOpen,
  onClose,
  title,
  items,
  onSelect,
  placeholder = "Select an option",
  maxHeight = "300px"
}) => {
  if (!isOpen) return null;

  const handleSelect = (item: string, index: number) => {
    onSelect(item, index);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-persian-indigo rounded-lg w-full max-w-md mx-auto transform transition-all">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-white font-fira-code text-lg font-medium">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <AnimatedList
            items={items}
            onItemSelect={handleSelect}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
            placeholder={placeholder}
            maxHeight={maxHeight}
            className="w-full rounded-l"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectionModal;