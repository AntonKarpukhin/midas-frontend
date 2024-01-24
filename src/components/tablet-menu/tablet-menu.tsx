import { TabletMenuProps } from "./tablet-menu.props";
import cn from 'classnames';
import styles from './tablet-menu.module.css';

const TabletMenu = ( {modal, setModal}: TabletMenuProps ) => {

	return (
		<div className={styles.TabletMenu} onClick={() => setModal(state => !state)}>
			<div className={styles.wrapperBurger}>
				<div className={cn(styles.wrapperLine, {
					[styles.wrapperLineOpen]: modal
				})}>
					<div className={cn(styles.lineBurger, {
						[styles.lineBurgerOne]: modal
					})}></div>
					<div className={cn(styles.lineBurger, {
						[styles.lineBurgerTwo]: modal
					})}></div>
					<div className={cn(styles.lineBurger, {
						[styles.lineBurgerThree]: modal
					})}></div>
				</div>
				<p className={cn(styles.name, {
					[styles.nameOpen]: modal
				})}>{modal ? 'ЗАКРЫТЬ' : 'МЕНЮ'}</p>
			</div>
		</div>
	)
}

export default TabletMenu;