import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/20/solid";
import { PhotoEntry, reviewPhotoStore, setPhotoEntry } from "../store";

export default function ReviewOptions() {
  const importSettings = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        // @ts-ignore
        id: "importedSettings",
        types: [
          {
            description: "JSON Settings",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      });
      const data = await fileHandle.getFile();
      // A json is an entries of [string, PhotoEntry]
      const json = JSON.parse(await data.text());
      const entiresMap = new Map<string, PhotoEntry>(json);
      // Imported settings will based on the current revision
      const { photoEntries } = reviewPhotoStore.getState();
      let photosUpdated = 0;
      for await (const [name, existing] of photoEntries) {
        const settings = entiresMap.get(name);
        if (settings && settings.review) {
          // Merge the review settings
          photosUpdated++;
          setPhotoEntry({
            ...existing,
            review: settings.review,
          });
        }
      }
      alert(`Imported ${photosUpdated} of ${photoEntries.size} photos.`);
    } catch (err) {
      console.error(err);
    }
  };

  const exportSettings = async () => {};

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Options
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-20 right-0 mt-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={importSettings}
                >
                  <CloudArrowUpIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Import Develop Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={exportSettings}
                >
                  <CloudArrowDownIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Export Develop Settings
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <ClipboardDocumentCheckIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Select Revisions
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
