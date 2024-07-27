"use client";
import { Input } from "@/components/ui/input";
import { FiPlus, FiTrash } from "react-icons/fi";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import TextEditor from "@/components/custom/textEditor";
// import { useState } from "";

export default function DashboardScreen() {
  const [fields, setFields] = useState([
    { id: Date.now(), name: "", value: "" },
  ]);

  const handleAddField = () => {
    setFields([...fields, { id: Date.now(), name: "", value: "" }]);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleChange = (id, event) => {
    const { name, value } = event.target;
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [name]: value } : field
      )
    );
  };
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full -ml-6 -my-6 p-6 rounded-sm"
    >
      <ResizablePanel className="-ml-6 -my-6" defaultSize={40}>
        <div className=" border-r-2 border-solid h-screen overflow-y-auto bg-white w-full p-6 shadow-lg text-white ">
          <div className="mb-4">
            <label className="block text-sm font-medium min-w-6 text-gray-400 mb-1">
              Picture
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <Input
                type="text"
                className="rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring focus:border-blue-500 w-full"
                placeholder="Mollit harum laboris"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Full Name
            </label>
            <Input
              type="text"
              className=" rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring focus:border-blue-500 w-full"
              placeholder="Minerva Frazier"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Headline
            </label>
            <Input
              type="text"
              className=" rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring focus:border-blue-500 w-full"
              placeholder="Minerva Frazier"
            />
          </div>
          <div className="flex w-full justify-between gap-3 ">
            <div className="mb-4 w-full">
              <label className="block text-sm  font-medium text-gray-400 mb-1">
                Email
              </label>
              <Input
                type="text"
                className="rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring focus:border-blue-500 w-full"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Website
              </label>
              <Input
                type="url"
                className=" rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring focus:border-blue-500 w-full"
                placeholder="Minerva Frazier"
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-3 ">
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Phone
              </label>
              <Input
                type="text"
                className="rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring focus:border-blue-500 w-full"
                placeholder="phone"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Location
              </label>
              <Input
                type="text"
                className=" rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring focus:border-blue-500 w-full"
                placeholder="location"
              />
            </div>
          </div>
          <div className="rounded-lg  text-black w-full max-w-xl">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={field.name}
                  onChange={(e) => handleChange(field.id, e)}
                  className="border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring  w-1/2"
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) => handleChange(field.id, e)}
                  className=" border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring w-1/2"
                />
                <button
                  onClick={() => handleRemoveField(field.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddField}
              className="flex items-center space-x-2 text-slate-400 mt-4"
            >
              <FiPlus size={20} />
              <span>Add a custom field</span>
            </button>
          </div>

          <div className="my-4 w-full">
            <label className="block text-xl font-medium text-gray-400 mb-2">
              Summary
            </label>
            <TextEditor />
          </div>
          <div className="my-4 w-full">
            <label className="block text-xl font-medium text-gray-400 mb-2">
              Profiles
            </label>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="w-full">
        <div>Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
