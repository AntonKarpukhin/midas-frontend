export interface TabletMenuProps {
	modal: boolean;
	setModal: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}