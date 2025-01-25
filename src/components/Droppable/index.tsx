import React, { ReactNode } from "react";
import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id,
  } as UseDroppableArguments);

  return (
    <div ref={setNodeRef} className="min-h-[200px]">
      {children}
    </div>
  );
}
