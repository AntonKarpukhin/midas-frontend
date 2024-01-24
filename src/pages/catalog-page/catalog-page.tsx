import LayoutCatalog from "../../containers/layout-catalog/layout-catalog";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { findMenuPath } from "../../utils/findMenuPath";
import { useEffect, useState } from "react";
import { catalogActions, getCatalog } from "../../services/reducers/catalog-reducer";
import ErrorMessageInfo from "../../components/error-message-info/error-message-info";

const CatalogPage = () => {

	const [menuTitle, setMenuTitle] = useState<string>('')
	const { catalog, catalogErrorMessage } = useSelector((state: RootState) => state.catalog);
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();

	useEffect(() => {
		dispatch(catalogActions.clearCatalogMessage());
		const path = location.pathname.slice(9);
		const menu = findMenuPath(path);
		setMenuTitle(menu);
		dispatch(getCatalog(menu));
	}, [location])

	return (
		<>
			{catalogErrorMessage && <ErrorMessageInfo error={catalogErrorMessage}/>}
			{catalog.length > 0 && menuTitle && <LayoutCatalog catalog={catalog} title={menuTitle} />}
		</>
	)
}

export default CatalogPage