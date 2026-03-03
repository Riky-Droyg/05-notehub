import { Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { NoteFormData, Note } from "../../types/note";
import type { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNoteService } from "../../services/noteService";

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "title must be at least 3 characters")
    .max(50, "title is too long")
    .required("title is required"),
  content: Yup.string().max(500, "content is too long"),
  tag: Yup.mixed<"Todo" | "Work" | "Personal" | "Meeting" | "Shopping">()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("tag is required"),
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NoteFormProps {
  closeModal?: () => void;
  dateForm: NoteFormData;
  setDateForm: Dispatch<SetStateAction<NoteFormData>>;
  setOpenModalState: Dispatch<SetStateAction<boolean>>;
}

function NoteForm({ setOpenModalState, dateForm, closeModal }: NoteFormProps) {
  const queryClient = useQueryClient(); // ✅ спочатку

  const createNotes = useMutation<NotesResponse, Error, NoteFormData>({
    mutationFn: (form) => createNoteService(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myQueryKey"] });
      setOpenModalState(false);
    },
  });

  return (
    <Formik
      validationSchema={NoteFormSchema}
      initialValues={dateForm}
      onSubmit={async (values) => {
        await createNotes.mutateAsync(values); // ✅ так
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          {/* поля без змін */}
          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;