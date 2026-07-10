import { useId } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: "top" | "bottom";
}

export default function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const id = useId();

  return (
    <span className="tooltip-wrapper">
      {children}
      <span
        className={`tooltip tooltip--${position}`}
        role="tooltip"
        id={id}
      >
        {content}
      </span>
    </span>
  );
}
