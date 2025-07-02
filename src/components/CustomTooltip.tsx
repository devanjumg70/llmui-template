import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface TooltipPosition {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
}

interface CustomTooltipProps {
  children: ReactNode;
  content: string;
  disabled?: boolean;
  delay?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  content,
  disabled = false,
  delay = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = (): TooltipPosition => {
    if (!triggerRef.current) {
      return { top: 0, left: 0, placement: 'top' };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Estimate tooltip dimensions (will be refined after render)
    const tooltipWidth = Math.min(250, content.length * 8 + 32); // Rough estimate
    const tooltipHeight = 40; // Approximate height
    const offset = 8;
    const arrowSize = 6;

    // Calculate horizontal center position
    let left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
    
    // Ensure tooltip doesn't extend beyond viewport edges
    const padding = 16;
    if (left < padding) {
      left = padding;
    } else if (left + tooltipWidth > viewportWidth - padding) {
      left = viewportWidth - tooltipWidth - padding;
    }

    // Determine vertical placement
    const spaceAbove = triggerRect.top;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const requiredSpace = tooltipHeight + offset + arrowSize;

    let placement: 'top' | 'bottom' = 'top';
    let top: number;

    if (spaceAbove >= requiredSpace) {
      // Place above
      placement = 'top';
      top = triggerRect.top - tooltipHeight - offset - arrowSize;
    } else if (spaceBelow >= requiredSpace) {
      // Place below
      placement = 'bottom';
      top = triggerRect.bottom + offset + arrowSize;
    } else {
      // Default to top if both spaces are insufficient
      placement = 'top';
      top = Math.max(padding, triggerRect.top - tooltipHeight - offset - arrowSize);
    }

    return { top, left, placement };
  };

  const showTooltip = () => {
    if (disabled || !content.trim()) return;
    
    timeoutRef.current = setTimeout(() => {
      const pos = calculatePosition();
      setPosition(pos);
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update position when tooltip becomes visible
  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const pos = calculatePosition();
      setPosition(pos);
    }
  }, [isVisible, content]);

  const tooltipElement = isVisible && position ? (
    <div
      ref={tooltipRef}
      className="tooltip-container"
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
      role="tooltip"
    >
      <div
        className={`
          tooltip-content
          ${position.placement === 'top' ? 'tooltip-top' : 'tooltip-bottom'}
        `}
      >
        {content}
        <div className={`tooltip-arrow tooltip-arrow-${position.placement}`} />
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby={isVisible ? 'custom-tooltip' : undefined}
        className="tooltip-trigger"
      >
        {children}
      </div>
      {tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
};

export default CustomTooltip;