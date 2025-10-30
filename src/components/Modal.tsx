import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ListItem, ListItemFormData } from "../types/ListItem";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ListItemFormData) => void;
  item?: ListItem;
}

export default function Modal({ isOpen, onClose, onSubmit, item }: ModalProps) {
  const [formData, setFormData] = useState<ListItemFormData>({
    title: "",
    subtitle: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        subtitle: item.subtitle,
      });
    } else {
      setFormData({
        title: "",
        subtitle: "",
      });
    }
  }, [item]);

  const onClean = (): void => {
    setFormData({
      title: "",
      subtitle: "",
    });
  };

  const validateForm = (): boolean => {
    const newErrors = {
      title: "",
      subtitle: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClean();
      onClose();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed max-md:top-20 inset-0 z-10 w-screen overflow-y-auto">
          <div className="sm:flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {item ? "Edit Item" : "Create New Item"}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm text-left font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.title}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="subtitle"
                          className="block text-left text-sm font-medium text-gray-700"
                        >
                          Subtitle
                        </label>
                        <input
                          type="text"
                          name="subtitle"
                          id="subtitle"
                          value={formData.subtitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subtitle: e.target.value,
                            })
                          }
                          className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.subtitle && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.subtitle}
                          </p>
                        )}
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                        >
                          {item ? "Save Changes" : "Create"}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
