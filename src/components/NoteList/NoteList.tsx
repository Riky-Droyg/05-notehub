import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNoteService } from "../../services/noteService";
type NoteListProps = {
	notes: Note[];
};

function NoteList({ notes }: NoteListProps) {
	const queryClient = useQueryClient(); // ✅ спочатку

	const deleteNote = useMutation({
		mutationFn: async (id: string) => deleteNoteService(id),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["myQueryKey"] });
		},
	});
	const elListNotes = notes?.map((el) => {
		return (
			<li
				key={el.id}
				className={css.listItem}
			>
				<h2 className={css.title}>{el.title}</h2>
				<p className={css.content}>{el.content}</p>

				<div className={css.footer}>
					<span className={css.tag}>{el.tag}</span>
					<button
						className={css.button}
						type="button"
						onClick={() => deleteNote.mutateAsync(el.id)}
					>
						Delete
					</button>
				</div>
			</li>
		);
	});
	return <ul className={css.list}>{(notes?.length ?? 0) && elListNotes}</ul>;
}

export default NoteList;
