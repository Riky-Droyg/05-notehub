import axios from "axios";
import type { Note, NoteFormData } from "../types/note";
import type { NotesResponse } from "../components/NoteForm/NoteForm";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

export async function noteService(query: string, page: number): Promise<NotesResponse> {
	try {
		const res = query ? await axios.get<NotesResponse>("/notes", { params: { search: query, page: page } }) : await axios.get<NotesResponse>("/notes");

		return {
			notes: res.data.notes,
			totalPages: res.data.totalPages,
		};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error(err.response?.data?.status_message ?? err.message);
		}
		throw err;
	}
}

export async function createNoteService(dataForm: NoteFormData) {
	try {
		console.log(dataForm);
		const res = await axios.post<NotesResponse>("/notes", dataForm);
		console.log(res.data);
		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error(err.response?.data?.status_message ?? err.message);
		}
		throw err;
	}
}

export async function deleteNoteService(id: string) {
	try {
		const res = await axios.delete<Note>(`/notes/${id}`);
		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error(err.response?.data?.status_message ?? err.message);
		}
		throw err;
	}
}
