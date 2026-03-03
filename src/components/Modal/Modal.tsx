import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import type { Dispatch, SetStateAction } from "react";
import type { NotesResponse, typeNoteForm } from "../../types/note";
import NoteForm from "../NoteForm/NoteForm";
type ModalProps = {
	closeModal?: () => void;
	dateForm: typeNoteForm;
	setDateForm: Dispatch<SetStateAction<typeNoteForm>>;
	createNotes: (form: typeNoteForm) => Promise<NotesResponse>;
};

function Modal({ createNotes, dateForm, setDateForm, closeModal }: ModalProps) {
	return createPortal(
		<div
			className={css.backdrop}
			role="dialog"
			aria-modal="true"
		>
			<div className={css.modal}>
				<NoteForm
					createNotes={createNotes}
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
