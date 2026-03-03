import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { NotesResponse, typeNoteForm } from "../../types/note";
import type { Dispatch, SetStateAction } from "react";

const NoteFormSchema = Yup.object().shape({
	title: Yup.string().min(3, "title must be at least 3 characters").max(50, "title is too long").required("title is required"),
	content: Yup.string().max(500, "title is too long").required("content is required"),
});

type NoteFormProps = {
	closeModal?: () => void;
	dateForm: typeNoteForm;
	setDateForm: Dispatch<SetStateAction<typeNoteForm>>;
	createNotes: (form: typeNoteForm) => Promise<NotesResponse>;
};

function NoteForm({ createNotes, dateForm, closeModal }: NoteFormProps) {
	return (
		<Formik
			validationSchema={NoteFormSchema}
			initialValues={dateForm}
			onSubmit={async (values: typeNoteForm) => {
				await createNotes(values);
			}}
		>
			{({ isSubmitting }) => (
				<Form className={css.form}>
					<div className={css.formGroup}>
						<label htmlFor="title">Title</label>
						<Field
							id="title"
							type="text"
							name="title"
							className={css.input}
						/>
						<ErrorMessage
							name="title"
							component="span"
							className={css.error}
						/>
					</div>

					<div className={css.formGroup}>
						<label htmlFor="content">Content</label>
						<Field
							as="textarea"
							id="content"
							name="content"
							rows={8}
							className={css.textarea}
						/>
						<ErrorMessage
							name="content"
							component="span"
							className={css.error}
						/>
					</div>

					<div className={css.formGroup}>
						<label htmlFor="tag">Tag</label>
						<Field
							as="select"
							id="tag"
							name="tag"
							className={css.select}
						>
							<option value="Todo">Todo</option>
							<option value="Work">Work</option>
							<option value="Personal">Personal</option>
							<option value="Meeting">Meeting</option>
							<option value="Shopping">Shopping</option>
						</Field>
						<ErrorMessage
							name="tag"
							component="span"
							className={css.error}
						/>
					</div>

					<div className={css.actions}>
						<button
							type="button"
							className={css.cancelButton}
							onClick={closeModal}
						>
							Cancel
						</button>
						<button
							type="submit"
							className={css.submitButton}
							disabled={isSubmitting}
						>
							Create note
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default NoteForm;
