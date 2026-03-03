import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import type { Dispatch, SetStateAction } from "react";
import type { NoteFormData } from "../../types/note";
import NoteForm from "../NoteForm/NoteForm";
type ModalProps = {
	closeModal?: () => void;
	dateForm: NoteFormData;
	setDateForm: Dispatch<SetStateAction<NoteFormData>>;
	setOpenModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({setOpenModalState , dateForm, setDateForm, closeModal }: ModalProps) {
	return createPortal(
		<div
			className={css.backdrop}
			role="dialog"
			aria-modal="true"
		>
			<div className={css.modal}>
				<NoteForm
					setOpenModalState = {setOpenModalState}
					closeModal={closeModal}
					dateForm={dateForm}
					setDateForm={setDateForm}
				/>
			</div>
		</div>,
		document.body,
	);
}

export default Modal;
