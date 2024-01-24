import { TabletItemLinkProps } from "./tablet-item-link.props";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./tablet-item-link.module.css";


const TabletItemLink = ({ name, img, link, closeModal}: TabletItemLinkProps) => {
	return (
		<Link className={styles.TabletItemLink} to={link} onClick={() => closeModal(false)}>
			<img className={styles.img} src={img} alt={name}/>
			<p className={styles.p}>{name}</p>
		</Link>
	)
}

export default TabletItemLink;