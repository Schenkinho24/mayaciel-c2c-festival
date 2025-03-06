
import React, { Fragment } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  className
}: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-scale-in">
        <div 
          className={cn(
            "rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-enter", 
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
