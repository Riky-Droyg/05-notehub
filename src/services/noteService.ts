import axios from "axios";
import type { NotesResponse, typeNoteForm } from "../types/note";

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

export async function createNoteService(dateForm: typeNoteForm) {
	try {
		console.log(dateForm);
		const res = await axios.post<NotesResponse>("/notes", dateForm);
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
export async function deleteNoteService(id: string) {
	try {
		console.log(id);
		const res = await axios.delete<NotesResponse>(`/notes/${id}`);
		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error(err.response?.data?.status_message ?? err.message);
		}
		throw err;
	}
}
