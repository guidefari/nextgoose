"use client";
import type React from "react";
import {
	Root,
	Viewport,
	Corner,
	Scrollbar,
	Thumb,
} from "@radix-ui/react-scroll-area";

type Props = {
	children: React.ReactNode;
};

const HorizontalScrollCards = ({ children }: Props) => (
	<Root className="shadow-sm shadooo ">
		<Viewport className="w-full">
			<div className="flex space-x-8 ">{children}</div>
			<Scrollbar orientation="horizontal">
				<Thumb />
			</Scrollbar>
			<Corner />
		</Viewport>
	</Root>
);

export default HorizontalScrollCards;
