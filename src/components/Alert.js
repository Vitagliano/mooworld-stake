import React, { useState } from "react";
import Link from "next/link";
export default function Alert(props) {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-center px-4 sm:px-0 fixed z-[999] bottom-0 left-0 right-0">
        <div
          id="alert"
          className={
            !flag
              ? "lg:w-6/12 transition duration-150 ease-in-out bg-burple/30 backdrop-blur-lg shadow rounded-md border-[1px] border-white/10 md:flex justify-between items-center top-0 mt-12 mb-8 py-4 px-4 "
              : "lg:w-6/12 transition duration-150 ease-in-out bg-burple/30 backdrop-blur-lg shadow rounded-md border-[1px] border-white/10 justify-between items-center top-0 mt-12 mb-8 py-4 px-4 hidden"
          }
        >
          <div className="sm:flex items-center">
            <div className="flex items-end">
              <div className="mr-2 mt-0.5 sm:mt-0 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={22}
                  height={22}
                  fill="currentColor"
                >
                  <path
                    className="heroicon-ui"
                    d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                  />
                </svg>
              </div>
              <p className="mr-2 text-base text-white">Warning</p>
            </div>
            <div className="h-1 w-1 bg-burple rounded-full mr-2 hidden xl:block" />
            <p className="text-base text-white">
              From August 12th to 19th only Moo Kingdom rank holders will be
              able to stake their Moos
            </p>
          </div>
          <div className="flex justify-end mt-4 md:mt-0 md:pl-4 lg:pl-0">
            <span className="text-sm mr-4 ursor-pointer text-white">
              <Link href="discord.gg/mooworld">Join Discord</Link>
            </span>
            <span
              onClick={() => setFlag(true)}
              className="text-sm cursor-pointer text-gray-500"
            >
              Dismiss
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
