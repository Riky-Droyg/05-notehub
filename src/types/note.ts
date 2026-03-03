export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}



  type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

  export type typeNoteForm = {
    title: string;
    content: string;
    tag: Tag;
  };