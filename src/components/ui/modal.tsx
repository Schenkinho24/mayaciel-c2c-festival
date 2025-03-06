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
  return <Fragment>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity animate-fade-in" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-scale-in">
        <div className={cn("bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto animate-enter", className)} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-tequila-secondary">
            {title}
            <Button variant="ghost" size="icon" onClick={onClose} className="ml-auto text-tequila-dark hover:bg-tequila-neutral">
              <X className="h-5 w-5" />
              <span className="sr-only">Schließen</span>
            </Button>
          </div>
          <div className="p-4 md:p-6">
            {children}
          </div>
        </div>
      </div>
    </Fragment>;
}