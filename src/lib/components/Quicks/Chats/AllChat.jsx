import Image from "next/image";
import React from "react";

const AllChat = ({ item, chats, index, onChange = () => {} }) => {
	return (
		<div
			className={`flex gap-4 py-[22px] ${
				index !== chats.length - 1 ? "border-b border-primary-gray" : ""
			}`}
		>
			<div className="relative flex flex-none h-[34px] w-[51px]">
				<div className="size-[34px] absolute flex justify-center items-center rounded-full bg-primary-lightGray">
					<Image
						src="/icons/person_24px.svg"
						alt="quick"
						width={12}
						height={12}
					/>
				</div>
				<div className="size-[34px] absolute left-4 flex justify-center items-center rounded-full bg-primary-blue">
					<Image
						src="/icons/group-1607.svg"
						alt="quick"
						width={16}
						height={16}
					/>
				</div>
			</div>
			<div>
				<div className="flex gap-4">
					<div
						onClick={onChange}
						className="text-primary-blue cursor-pointer hover:underline font-bold"
					>
						{item.subject}
					</div>
					<div className="text-primary-darkGray flex-none text-sm">
						{item.date}
					</div>
				</div>
				<div className="text-primary-darkGray font-bold text-sm">
					{item.name} :
				</div>
				<div className="text-primary-darkGray text-sm">{item.message}</div>
			</div>
		</div>
	);
};

export default AllChat;
