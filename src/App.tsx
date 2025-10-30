import { useEffect, useState } from "react";
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
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { customToast } from "./utils/toast.config";
import LoadingScreen from "./components/loaders/LoadingScreen";

export default function App() {
  const [items, setItems] = useState<ListItemType[]>(listItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListItemType | undefined>();
  const [page, setPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<ListItemType[]>([]);

  const itemsPerPage = 4;

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedItems(items.slice(startIndex, endIndex));
  }, [page, items]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleCreateItem = (data: ListItemFormData) => {
    const newItem: ListItemType = {
      id: crypto.randomUUID(),
      ...data,
      dateCreated: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
    customToast("The item successfully created!", {
      type: "success",
    });
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
    customToast("The item successfully edited!", {
      type: "success",
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (paginatedItems.length === 1 && page > 1) {
      setPage((prev) => prev - 1);
    }
    customToast("The item successfully deleted!", {
      type: "success",
    });
  };

  const openCreateModal = () => {
    setSelectedItem(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (item: ListItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-8">
      <div className="flex flex-col h-[620px] justify-between max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex flex-wrap gap-4 border-b pb-6 max-md:fixed top-0 left-0 max-md:w-full max-md:p-4 max-md:bg-gray-100 dark:max-md:bg-gray-800 border-gray-300 dark:border-gray-700 justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              List Management
            </h1>
            <div className="flex gap-4">
              <div className="md:hidden">
                <ToggleTheme />
              </div>
              <button
                onClick={openCreateModal}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <PlusIcon className="md:-ml-0.5 md:mr-1.5 h-5 w-5" />
                <span className="max-md:hidden">Create Item</span>
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-white">
                No items yet. Click the Create Item button to add one.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[500px] max-md:mt-12 overflow-y-hidden overflow-x-hidden">
                {paginatedItems.map((item) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    onEdit={openEditModal}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center my-4 flex-wrap gap-2 sm:gap-3">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      page === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 dark:text-white active:scale-95"
                    }`}
                  >
                    <FaArrowLeft />
                  </button>

                  <div className="flex items-center gap-1 sm:gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (num) => (
                        <button
                          key={num}
                          onClick={() => setPage(num)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md text-sm font-medium flex items-center justify-center transition-all duration-200 ${
                            num === page
                              ? "bg-indigo-600 text-white shadow-md scale-105"
                              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-600 hover:text-indigo-700 dark:hover:text-white"
                          }`}
                        >
                          {num}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className={`px-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      page === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 dark:text-white active:scale-95"
                    }`}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <Footer />

        <div className="max-md:hidden">
          <ToggleTheme />
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={selectedItem ? handleEditItem : handleCreateItem}
          item={selectedItem}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
