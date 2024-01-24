import { HeadlingProps } from "./headling.props";
import styles from './headling.module.css';
import cn from 'classnames';


const Headling = ({children, className, ...props}: HeadlingProps) => {
	return (
		<>
			<h2 className={cn(styles.Headling, className)} {...props}>{children}</h2>
		</>

	)
}

export default Headling;