import React from "react";

const Cancel = ({ setSearchParam, searchParam }) => {
    const handleCancel = () => {
        setSearchParam("");
    }
  return (searchParam !== "") && (
    <button onClick={handleCancel}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        className=" h-[8px] fill-white"
      >
        <g id="ic_close" transform="translate(-20 -23)">
          <path
            id="Rectangle_3400"
            d="M0 0h15v15H0z"
            fill="none"
            data-name="Rectangle 3400"
            transform="translate(20 23)"
          ></path>
          <g id="ic_close-2" data-name="ic_close" transform="translate(-69)">
            <rect
              id="Rectangle_3176"
              width="14.323"
              height="2.176"
              fill="var(--MainHeader-SearchBox-searchIconFocusColor)"
              data-name="Rectangle 3176"
              rx="1"
              transform="rotate(45 16.299 123.704)"
            ></rect>
            <rect
              id="Rectangle_3181"
              width="14.323"
              height="2.176"
              fill="var(--MainHeader-SearchBox-searchIconFocusColor)"
              data-name="Rectangle 3181"
              rx="1"
              transform="rotate(-45 87.403 -92.076)"
            ></rect>
          </g>
        </g>
      </svg>
    </button>
  );
};

export default Cancel;
