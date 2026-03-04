import axios from "axios";
import type { Note, NoteFormData } from "../types/note";
import type { NotesResponse } from "../components/NoteForm/NoteForm";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

export async function noteService(query: string, page: number): Promise<NotesResponse> {
  try {
    const q = query.trim();

    const res = await axios.get<NotesResponse>("/notes", {
      params: {
        page,               // ✅ завжди
        ...(q ? { search: q } : {}), // ✅ search тільки якщо є
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error((err.response?.data as any)?.status_message ?? err.message);
    }
    throw err;
  }
}
export async function createNoteService(form: NoteFormData): Promise<Note> {
  try {
    const res = await axios.post<Note>("/notes", form);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error((err.response?.data as any)?.status_message ?? err.message);
    }
    throw err;
  }
}

export async function deleteNoteService(id: string): Promise<Note> {
  try {
    const res = await axios.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error((err.response?.data as any)?.status_message ?? err.message);
    }
    throw err;
  }
}