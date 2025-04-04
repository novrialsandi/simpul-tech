import React from "react";

const Label = () => {
	return (
		<div
			className={`flex gap-6 h-12 items-center w-full bg-[#f9f9f9] rounded-md`}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 29 31"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid meet"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M23.005 1.25732H11.116C9.80952 1.25732 8.75246 2.3889 8.75246 3.77194H20.6295C21.936 3.77194 23.005 4.90352 23.005 6.28656V22.6316L25.3804 23.8889V3.77194C25.3804 2.3889 24.3114 1.25732 23.005 1.25732ZM18.2543 8.80118V25.1085L13.254 22.8328L12.3157 22.4053L11.3774 22.8328L6.37719 25.1085V8.80118H18.2543ZM6.37712 6.28655H18.2542C19.5607 6.28655 20.6296 7.41813 20.6296 8.80117V28.9181L12.3157 25.1462L4.00171 28.9181V8.80117C4.00171 7.41813 5.07065 6.28655 6.37712 6.28655Z"
					fill="#4f4f4f"
				/>
			</svg>

			<div className={`text-primary-darkGray flex flex-col space-y-2`}>
				<div>halo</div>
			</div>
		</div>
	);
};

export default Label;
