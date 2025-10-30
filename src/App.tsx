import { useState } from "react";
import type {
  ListItem as ListItemType,
  ListItemFormData,
} from "./types/ListItem";
import ListItem from "./components/ListItem";
import Modal from "./components/dialogs/Modal";
import { PlusIcon } from "@heroicons/react/24/outline";
import Footer from "./components/common/Footer";
import { listItems } from "./service/items";
import ToggleTheme from "./components/common/ToggleTheme";

export default function App() {
  const [items, setItems] = useState<ListItemType[]>(listItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListItemType | undefined>();

  const handleCreateItem = (data: ListItemFormData) => {
    const newItem: ListItemType = {
      id: crypto.randomUUID(),
      ...data,
      dateCreated: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleEditItem = (data: ListItemFormData) => {
    if (!selectedItem) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? { ...item, title: data.title, subtitle: data.subtitle }
          : item
      )
    );
    setSelectedItem(undefined);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const openCreateModal = () => {
    setSelectedItem(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (item: ListItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-8">
      <div className="flex flex-col h-[620px] justify-between max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex flex-wrap gap-4 border-b pb-6 max-md:fixed top-0 left-0 max-md:w-full max-md:p-4 max-md:bg-gray-100 dark:max-md:bg-gray-800 border-gray-300 dark:border-gray-700 justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              List Management
            </h1>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="md:-ml-0.5 md:mr-1.5 h-5 w-5" aria-hidden="true" />
              <span className="max-md:hidden">Create Item</span>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-white">
                No items yet. Click the Create Item button to add one.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] max-md:mt-12 overflow-y-auto overflow-x-hidden">
              {items.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  onEdit={openEditModal}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </div>

        <Footer />

        <ToggleTheme />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={selectedItem ? handleEditItem : handleCreateItem}
          item={selectedItem}
        />
      </div>
    </div>
  );
}
