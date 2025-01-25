import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string | number; // Identificador único para o item
  children: ReactNode; // Conteúdo do item (pode ser qualquer JSX)
}

export function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform) || undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
