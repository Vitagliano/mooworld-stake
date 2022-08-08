import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import Container from "./container";
export default function Header({ connected, signerAddress, connectWallet }) {
  const [show, setShow] = useState(null);

  const connectButtonState = connected
    ? `${`0x${signerAddress.slice(2, 5)}...${signerAddress.slice(-5)}`}`
    : "Connect Wallet";
  return (
    <header>
      <Container>
        <div className="pt-10 pb-20 relative z-[99]">
          <div className="mx-auto max-w-full sm:max-w-full md:max-w-7xl lg:max-w-7xl flex flex-row items-center px-6 sm:px-6 lg:px-0 justify-between">
            <div className="cursor-pointer">
              <a href="/">
                <img alt="Moo World" src="./logo.png" className="w-[222px]" />
              </a>
            </div>
            {show ? (
              ""
            ) : (
              <div
                id="menu"
                className="flex sm:flex md:hidden lg:hidden p-[16px] backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                onClick={() => setShow(!show)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1={4} y1={6} x2={20} y2={6} />
                  <line x1={4} y1={12} x2={20} y2={12} />
                  <line x1={4} y1={18} x2={20} y2={18} />
                </svg>
              </div>
            )}
            <div className="sm:hidden md:flex lg:flex hidden flex-col sm:flex-col md:flex-row lg:flex-row items-center">
              <div>
                <Link href="https://discord.gg/mooworld">
                  <button className="p-[12px] mr-4 backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 text-white ease-in-out  hover:bg-blue hover:border-white duration-300">
                    <FaDiscord size={34} />
                  </button>
                </Link>
                <Link href="https://twitter.com/mooworldavax">
                  <button className="p-[12px] mr-4 backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 text-white ease-in-out  hover:bg-blue hover:border-white duration-300">
                    <FaTwitter size={34} />
                  </button>
                </Link>
              </div>
              <div>
                <button
                  disabled
                  className="cursor-default p-[16px] mr-4 backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-10 bg-blue/75 text-white/20 ease-in-out duration-300"
                >
                  Shop
                </button>
                <Link href="/stake">
                  <button className="p-[16px] mr-4 backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-10 bg-blue/75 text-white ease-in-out  hover:bg-blue hover:border-white duration-300">
                    Stake
                  </button>
                </Link>
                {connected && (
                  <Link href="https://joepegs.com/collections/0xcFd8402927f07A4D1e4DFe7f9C60f6EbF9Ed3673">
                    <button className="p-[16px] mr-4 backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-10 bg-blue/75 text-white ease-in-out  hover:bg-blue hover:border-white duration-300">
                      View Moos
                    </button>
                  </Link>
                )}
                {connected ? (
                  <button className="p-[16px] backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-10 bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300">
                    {connectButtonState}
                  </button>
                ) : (
                  <button
                    className="p-[16px] backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-10 bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                    onClick={() => connectWallet()}
                  >
                    {connectButtonState}
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* mobile nav */}
          <div
            className={
              show
                ? "w-full xl:hidden h-full absolute z-900  "
                : "   w-full xl:hidden h-full absolute z-090  transform -translate-x-full"
            }
          >
            <div className="w-full h-full" onClick={() => setShow(!show)} />
            <div className="w-full z-60 fixed overflow-y-auto  top-0 bg-blue shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Link href="/">
                            <img
                              alt="Moo World"
                              src="./logo.png"
                              className="w-[180px] sm:w-[180px] md:w-[333px] lg:w-[333px] "
                            />
                          </Link>
                        </div>
                        <div
                          id="cross"
                          className="flex sm:flex md:hidden lg:hidden p-[16px] backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                          onClick={() => setShow(!show)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-x"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <ul className="f-m-m">
                      <a className="cursor-pointer" target="_blank">
                        <li className="text-gray-800 pt-10">
                          <div className="flex items-center">
                            {connected && (
                              <Link href="https://joepegs.com/collections/0xcFd8402927f07A4D1e4DFe7f9C60f6EbF9Ed3673">
                                <button className="cursor-pointer p-[16px] bg-blue/75 text-white/80 ease-in-out duration-300 hover:text-white/100">
                                  View Moos
                                </button>
                              </Link>
                            )}
                          </div>
                        </li>
                      </a>
                      <li className="text-gray-800 pt-2">
                        <div className="flex items-center">
                          <Link href="/stake">
                            <button className="cursor-pointer p-[16px] bg-blue/75 text-white/80 ease-in-out duration-300 hover:text-white/100">
                              Stake
                            </button>
                          </Link>
                        </div>
                      </li>
                      <li className="text-gray-800">
                        <div className="flex items-center">
                          <button className="cursor-default p-[16px]  backdrop-blur-lg rounded-xl bg-blue/75 text-white/20 ease-in-out duration-300">
                            Shop{" "}
                            <small className="ml-2 text-white/100">SOON</small>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="border-t pt-4 border-blue-100">
                      <div className="w-full flex items-center justify-between pt-1">
                        {connected ? (
                          <button
                            onClick={() => deactivate()}
                            className="flex items-center"
                          >
                            <p className="leading-4 mb-0 p-[16px] w-full backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300">
                              {connectButtonState}
                            </p>
                          </button>
                        ) : (
                          <button
                            onClick={() => activate()}
                            className="flex items-center"
                          >
                            <p className="leading-4 mb-0 p-[16px] w-full backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300">
                              {connectButtonState}
                            </p>
                          </button>
                        )}

                        <ul className="flex">
                          <li className="cursor-pointer mr-2">
                            <div className="leading-4 p-[16px] backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300">
                              <a href="https://discord.gg/mooworld">
                                <FaDiscord size={18} />
                              </a>
                            </div>
                          </li>
                          <li className="cursor-pointer">
                            <div className="leading-4 p-[16px] backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300s">
                              <a href="https://twitter.com/mooworldavax">
                                <FaTwitter size={18} />
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* mobile nav */}
        </div>
      </Container>
    </header>
  );
}
