import React, { useState } from "react";

const Model = ({
  model,
  title,
  description,
  button,
  pending,
}: {
  model: string;
  title: string;
  description: string;
  button: string;
  pending: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handlerClick = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap justify-center gap-5">
          <div x-data="{modalOpen: false}">
            <button
              type="button"
              className="rounded-md bg-primary px-9 py-3 font-medium text-white"
              onClick={() => setOpen(true)}
            >
              {model}
            </button>
            <div
              x-show="modalOpen"
              x-transition=""
              className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
              style={{ display: open ? "" : "none" }}
            >
              <div className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15">
                <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  {title}
                </h3>
                <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
                <p className="mb-10 font-medium">{description}</p>
                <div className="-mx-3 flex flex-wrap gap-y-4">
                  <div className="w-full px-3 2xsm:w-1/2">
                    <button
                      type="button"
                      className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="w-full px-3 2xsm:w-1/2">
                    <button
                      className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                      onClick={() => handlerClick()}
                      disabled={pending}
                    >
                      {pending ? "Loading" : button}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
