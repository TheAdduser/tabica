import { ref } from 'vue';
import { useDraggable, useDroppable, DndContext } from '@dnd-kit/core';

export default {
  mounted(el, binding) {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: el.dataset.id,
    });

    const { setNodeRef: setDroppableRef } = useDroppable({
      id: el.dataset.id,
    });

    setNodeRef(el);
    setDroppableRef(el);

    Object.assign(el, attributes);
    Object.assign(el, listeners);
  },
};

export const handleDragEnd = async (event, columns, pb) => {
  const { active, over } = event;
  if (active.id !== over.id) {
    const oldIndex = columns.value.findIndex((col) => col.id === active.id);
    const newIndex = columns.value.findIndex((col) => col.id === over.id);

    const movedColumn = columns.value.splice(oldIndex, 1)[0];
    columns.value.splice(newIndex, 0, movedColumn);

    // Update columnOrder in PocketBase
    for (let i = 0; i < columns.value.length; i++) {
      await pb.collection('status').update(columns.value[i].id, {
        columnOrder: i,
      });
    }
  }
};