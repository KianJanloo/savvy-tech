import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { ListItem as ListItemType } from '../types/ListItem';

interface ListItemProps {
  item: ListItemType;
  onEdit: (item: ListItemType) => void;
  onDelete: (id: string) => void;
}

export default function ListItem({ item, onEdit, onDelete }: ListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.subtitle}</p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(item.dateCreated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(item)}
          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
