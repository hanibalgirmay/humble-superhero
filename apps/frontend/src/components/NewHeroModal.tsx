import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import HProvider from "./form/HProvider";
import HInputField from "./form/HInputField";

interface IModelProp {
  setOpenModal: () => void;
  handleForm: (data: any) => void;
  methods: any;
}
const NewHeroModal: React.FC<IModelProp> = ({ methods, setOpenModal, handleForm }) => {

  return (
    <div
      // id="hs-notifications"
      className="bg-neutral-500/30 drop-shadow-md size-full fixed -top-4 start-0 z-[80] overflow-x-hidden overflow-y-auto"
      role="dialog"
      tabIndex={-1}
      aria-labelledby=""
    >
      <div className=" mt-0 bg-white ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden">
          <div className="absolute top-2 end-2">
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none "
              aria-label="Close"
              onClick={setOpenModal}
              data-hs-overlay="#"
            >
              <span className="sr-only">Close</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>

        <FormProvider {...methods}>
          <HProvider handleFormSubmit={methods.handleSubmit(handleForm)}>
            <div className="p-4 sm:p-10 overflow-y-auto">
              <div className="mb-6 text-start">
                <h3
                  id="hs-notifications-label"
                  className="mb-2 text-xl font-bold text-gray-800"
                >
                  Add New Superhero
                </h3>
              </div>

              <div className="space-y-4">
                <HInputField name="name" label="Name" />
                <HInputField name="superpower" label="SuperPower" />
                <HInputField
                  type="number"
                  name="humilityScore"
                  label="FHumility Score"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 "
                data-hs-overlay="#hs-notifications"
                onClick={setOpenModal}
              >
                Cancel
              </button>
              <button
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
              >
                Add Superhero
              </button>
            </div>
          </HProvider>
        </FormProvider>
      </div>
    </div>
  );
};

export default NewHeroModal;
