
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
            "rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] bg-white flex flex-col overflow-hidden animate-enter", 
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-black/20 z-10"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Schließen</span>
          </Button>
          
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
