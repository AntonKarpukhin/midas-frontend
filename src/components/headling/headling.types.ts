import { HTMLAttributes, ReactNode } from 'react';


export interface IHeadlingTypes extends HTMLAttributes<HTMLHeadingElement>{
	children: ReactNode;
	appearance: 'large' | 'small';
}