import React, { useState } from "react";
import mooFren from "../../public/img/roles/moofren.png";
import mooProtector from "../../public/img/roles/mooprotector.png";
import mooSanctuary from "../../public/img/roles/moosanctuary.png";
import mooKingdom from "../../public/img/roles/mookingdom.png";
import Image from "next/image";
import Link from "next/link";
const MooTag = ({ mooQuantity }) => {
  const [tooltipStatus, setTooltipStatus] = useState(0);
  const roleTooltip = () => {
    return (
      <div
        className="relative"
        onMouseEnter={() => setTooltipStatus(1)}
        onMouseLeave={() => setTooltipStatus(0)}
      >
        <div className="mr-l cursor-pointer">
          <svg
            aria-haspopup="true"
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-info-circle"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#A0AEC0"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx={12} cy={12} r={9} />
            <line x1={12} y1={8} x2="12.01" y2={8} />
            <polyline points="11 12 12 12 12 16 13 16" />
          </svg>
        </div>
        {tooltipStatus == 1 && (
          <div
            role="tooltip"
            className="z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg backdrop-blur-full bg-white text-white p-4 rounded"
          >
            <svg
              className="absolute left-0 -ml-2 bottom-0 top-0 h-full"
              width="9px"
              height="16px"
              viewBox="0 0 9 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth={1}
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Tooltips-"
                  transform="translate(-874.000000, -1029.000000)"
                  fill="#FFFFFF"
                >
                  <g
                    id="Group-3-Copy-16"
                    transform="translate(850.000000, 975.000000)"
                  >
                    <g id="Group-2" transform="translate(24.000000, 0.000000)">
                      <polygon
                        id="Triangle"
                        transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                        points="4.5 57.5 12.5 66.5 -3.5 66.5"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <p className="text font-bold text-gray-800 pb-1">
              This is your holder rank
            </p>
            <p className="text-sm leading-4 text-gray-600 pb-3">
              Learn more about the different perks of each role on our Discord
            </p>
            <div className="flex items-center justify-center">
              <Link href="https://discord.gg/mooworld">
                <button className="focus:outline-none bg-burple transition duration-150 ease-in-out hover:bg-burple/90 rounded text-white px-5 py-2 flex items-center justify-center w-full text-sm">
                  Join Discord
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  const roleFilter = () => {
    if (mooQuantity === 1 && mooQuantity <= 2) {
      return "mooFren";
    }
    if (mooQuantity === 3 && mooQuantity <= 4) {
      return "mooProtector";
    }
    if (mooQuantity === 5 && mooQuantity <= 6) {
      return "mooSanctuary";
    }
    if (mooQuantity >= 7) {
      return "mooKingdom";
    }
  };

  const role = roleFilter();

  const mooRoles = {
    mooFren: {
      image: mooFren,
      name: "Moo Fren",
    },
    mooProtector: {
      image: mooProtector,
      name: "Moo Protector",
    },
    mooSanctuary: {
      image: mooSanctuary,
      name: "Moo Sanctuary",
    },
    mooKingdom: {
      image: mooKingdom,
      name: "Moo Kingdom",
    },
  };

  if (mooQuantity > 0) {
    return (
      <span className="px-5 py-3 flex items-center gap-2 justify-center backdrop-blur-full rounded-full border-[1px] border-white/10 bg-blue/75 text-white">
        <Image
          src={mooRoles[role].image}
          alt={mooRoles[role].name}
          width={24}
          height={24}
        />
        {mooRoles[role].name}
        {roleTooltip()}
      </span>
    );
  }

  return null;
};

export default MooTag;
