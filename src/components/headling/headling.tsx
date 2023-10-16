import { IHeadlingTypes } from './headling.types';
import cn from 'classnames';
import styles from './headling.module.css';


const Headling = ({children, appearance, className, ...props}: IHeadlingTypes) => {
	return (
		<h2 className={cn(styles.headling, className, {
			[styles.large]: appearance === 'large',
			[styles.small]: appearance === 'small'
		})} {...props}>{children}</h2>
	);
};


export default Headling;