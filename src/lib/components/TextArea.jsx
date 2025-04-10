import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useChatsStore } from "../stores/chats";

const TextArea = ({
	active = true,
	isFocused = false,
	setIsFocused = () => {},
	name = "",
	id = `id-${Date.now()}`,
	placeholder = "Type here ...",
	value: initialValue = "",
	className = "",
	isDescription = false,
	debounceTime = null, // in milliseconds
	onKeyDown = () => {},
	onChange = () => {},
	isChat = false,
	replyMessage = null,
}) => {
	const [value, setValue] = useState(initialValue);
	const fieldRef = useRef(null);
	const timerRef = useRef(null);
	const [isFocusedText, setIsFocusedText] = useState(false);
	const { setReplyMessage } = useChatsStore();

	useEffect(() => {
		const textarea = fieldRef.current;
		if (!textarea) return;

		// Store original width to detect horizontal overflow
		const originalWidth = textarea.offsetWidth;

		// Store original styles before modifying
		const originalStyles = {
			height: textarea.style.height,
			overflowY: textarea.style.overflowY,
		};

		// Reset to content height with hidden overflow
		textarea.style.height = "auto";
		textarea.style.overflowY = "hidden";

		// Create a clone to test if content would overflow horizontally
		const clone = textarea.cloneNode(true);
		clone.style.position = "absolute";
		clone.style.visibility = "hidden";
		clone.style.height = "auto";
		clone.style.width = originalWidth + "px";
		clone.style.whiteSpace = "nowrap";
		document.body.appendChild(clone);

		// Check for horizontal overflow or line breaks
		const wouldOverflow = clone.scrollWidth > originalWidth;
		const hasLineBreaks = value.includes("\n");

		// Get minimum height from CSS or default
		const computedStyle = window.getComputedStyle(textarea);
		const minHeight =
			parseInt(computedStyle.minHeight) ||
			parseInt(computedStyle.lineHeight) ||
			20;

		if (value === "" || (!wouldOverflow && !hasLineBreaks)) {
			// Reset to minimum height when empty or no overflow
			textarea.style.height = `${minHeight}px`;
		} else {
			// Set to content height when there's content that needs wrapping
			textarea.style.height = `${textarea.scrollHeight}px`;
		}

		// Restore original overflow setting
		textarea.style.overflowY = originalStyles.overflowY;

		// Remove the clone
		document.body.removeChild(clone);
	}, [value]);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const debounce = (e) => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			setValue(e.target.value);
			onChange(e);
		}, debounceTime);
	};

	const handleChange = (e) => {
		if (debounceTime) {
			debounce(e);
		} else {
			setValue(e.target.value);
			onChange(e);
		}
	};

	return (
		<div
			className={`flex gap-6 ${
				!value || isFocused || isFocusedText ? "items-center" : ""
			}`}
		>
			{isDescription && (
				<svg
					onClick={() => fieldRef.current?.focus()} // focus on textarea
					className="cursor-pointer" // optional: shows it's clickable
					width="20"
					height="20"
					viewBox="0 0 24 23"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M19.3092 0C18.9949 0 18.668 0.125731 18.4291 0.36462L16.1282 2.6655L20.8431 7.38041L23.144 5.07953C23.6343 4.58918 23.6343 3.79708 23.144 3.30673L20.2019 0.36462C19.9504 0.113158 19.6361 0 19.3092 0ZM14.7831 7.569L15.9398 8.72573L4.54857 20.117H3.39185V18.9602L14.7831 7.569ZM0.877197 17.9167L14.783 4.01081L19.498 8.72572L5.59211 22.6316H0.877197V17.9167Z"
						fill={value ? "#2F80ED" : "#4f4f4f"}
					/>
				</svg>
			)}
			<div
				className={`text-primary-darkGray ${
					isChat
						? "border-primary-gray w-[592px] border rounded-md "
						: !value || isFocused || isFocusedText
						? "border-primary-gray border rounded-md py-2 px-[17.5px] space-y-2"
						: ""
				} flex flex-col `}
			>
				{isChat && replyMessage && (
					<div className="relative bg-[#f2f2f2] rounded-t-md py-2 px-3 border-b">
						<div className="absolute top-2 right-2">
							<button
								className="cursor-pointer"
								onClick={() => {
									setReplyMessage(null);
								}}
							>
								<Image
									src="/icons/close_24px.svg"
									alt="quick"
									width={14}
									height={14}
									className="text-primary-blue m-1"
								/>
							</button>
						</div>
						<div className="font-medium">Reply to {replyMessage.name}</div>
						<div className="text-sm">{replyMessage.message}</div>
					</div>
				)}
				<textarea
					suppressHydrationWarning
					id={id}
					name={name}
					placeholder={placeholder}
					value={isChat ? initialValue : value}
					ref={fieldRef}
					autoComplete="off"
					rows={1}
					onKeyDown={onKeyDown}
					onChange={handleChange}
					onFocus={() => {
						setIsFocused(true);
						setIsFocusedText(true);
					}}
					onBlur={() => {
						setIsFocused(false);
						setIsFocusedText(false);
					}}
					className={`${className} flex
                        ${!active ? "line-through text-primary-gray" : ""} ${
						isDescription
							? "w-[543px] font-normal"
							: isChat
							? "mx-3 my-2"
							: value
							? "font-bold w-[346px]"
							: "font-normal w-[346px]"
					} resize-none outline-0 focus:border-active focus:ring-0 placeholder-primary-darkGray`}
				/>
			</div>
		</div>
	);
};

export default TextArea;
