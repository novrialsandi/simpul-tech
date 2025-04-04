import React, { useState, useRef, useEffect } from "react";

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
}) => {
	const [value, setValue] = useState(initialValue);
	const fieldRef = useRef(null);
	const timerRef = useRef(null);

	// Auto-resize effect
	useEffect(() => {
		const textarea = fieldRef.current;
		if (textarea) {
			textarea.style.height = "auto"; // Reset height
			textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
		}
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
		<div className={`flex gap-6 ${!value || isFocused ? "items-center" : ""}`}>
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
					!value || isFocused
						? "border-primary-gray border rounded-md py-2 px-4"
						: ""
				} flex flex-col space-y-2`}
			>
				<textarea
					suppressHydrationWarning
					id={id}
					name={name}
					placeholder={placeholder}
					value={value}
					ref={fieldRef}
					autoComplete="off"
					rows={1}
					onKeyDown={onKeyDown}
					onChange={handleChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={`${className} flex
                        ${!active ? "line-through text-primary-gray" : ""} ${
						isDescription
							? "w-[543px] font-normal"
							: value
							? "font-bold w-[340px]"
							: "font-normal w-[340px]"
					} resize-none outline-0 focus:border-active focus:ring-0 placeholder-primary-darkGray`}
				/>
			</div>
		</div>
	);
};

export default TextArea;
