import React from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-apple max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-apple-lg animate-scale-in">
        {/* Header */}
        {title && (
          <div className="sticky top-0 bg-white border-b border-apple-gray-200 px-8 py-6 flex items-center justify-between rounded-t-apple">
            <h2 className="text-3xl font-bold text-apple-gray-900 tracking-tight">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-apple-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-apple-gray-400" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
