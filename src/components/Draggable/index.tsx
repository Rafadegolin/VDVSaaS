import React, { ReactNode } from "react";
import {
  useDraggable,
  UseDraggableArguments,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";

interface DraggableProps {
  id: string;
  children: ReactNode;
}

export function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  } as UseDraggableArguments);

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(listeners as DraggableSyntheticListeners)}
      {...attributes}
    >
      {children}
    </div>
  );
}
