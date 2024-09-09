import React, { useState, useRef, useEffect, memo } from "react";
import clsx from "clsx";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
  placement?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  placement = "bottom",
}) => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseLeave = () => setOpen(false);
    const handleMouseEnter = () => setOpen(true);

    const tooltipElement = tooltipRef.current;
    tooltipElement?.addEventListener("mouseenter", handleMouseEnter);
    tooltipElement?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tooltipElement?.removeEventListener("mouseenter", handleMouseEnter);
      tooltipElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative" ref={tooltipRef}>
      {children}
      {open && (
        <div
          className={clsx(
            "absolute z-50 rounded bg-gray-700 p-2 text-sm text-white",
            placement === "top" &&
              "bottom-full left-1/2 mb-2 -translate-x-1/2 transform",
            placement === "bottom" &&
              "left-1/2 top-full mt-2 -translate-x-1/2 transform",
            placement === "left" &&
              "right-full top-1/2 mr-2 -translate-y-1/2 transform",
            placement === "right" &&
              "left-full top-1/2 ml-2 -translate-y-1/2 transform",
          )}
        >
          {title}
          <div
            className={clsx(
              "absolute z-50 h-3 w-3 rotate-45 transform bg-gray-700",
              placement === "top" &&
                "bottom-[-0.375rem] left-1/2 -translate-x-1/2 transform",
              placement === "bottom" &&
                "left-1/2 top-[-0.375rem] -translate-x-1/2 transform",
              placement === "left" &&
                "right-[-0.375rem] top-1/2 -translate-y-1/2 transform",
              placement === "right" &&
                "left-[-0.375rem] top-1/2 -translate-y-1/2 transform",
            )}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Tooltip);
