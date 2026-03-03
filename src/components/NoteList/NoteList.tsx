import css from "./NoteList.module.css";
import type { Note, NotesResponse } from "../../types/note";
type NoteListProps = {
	notes?: Note[];
	deleteNote: (id: string) => Promise<NotesResponse>;
};

function NoteList({ deleteNote, notes }: NoteListProps) {
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
						onClick={() => deleteNote(el.id)}
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
