import { HTMLAttributes, ReactNode } from "typescript";


export interface HeadlingProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}