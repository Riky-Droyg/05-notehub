import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import type { NoteFormData } from "../../types/note";
import { noteService } from "../../services/noteService";

function App() {
	const [page, setPage] = useState<number>(1);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [openModalState, setOpenModalState] = useState<boolean>(false);

	const [dateForm, setDateForm] = useState<NoteFormData>({
		title: "",
		content: "",
		tag: "Todo",
	});

	const { data } = useQuery({
		queryKey: ["myQueryKey", searchQuery, page],
		queryFn: () => noteService(searchQuery, page),
	});

	

	

	function openModal() {
		setOpenModalState(!openModalState);
	}

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox
					setSearchQuery={setSearchQuery}
					searchQuery={searchQuery}
				/>

				<ReactPaginate
					pageCount={data?.totalPages ?? 1}
					pageRangeDisplayed={5}
					marginPagesDisplayed={1}
					onPageChange={({ selected }) => setPage(selected + 1)}
					forcePage={page - 1}
					containerClassName={css.pagination}
					activeClassName={css.active}
					nextLabel="→"
					previousLabel="←"
				/>
				<button
					onClick={openModal}
					className={css.button}
				>
					Create note +
				</button>
			</header>
			<NoteList notes={data?.notes ?? []} />

			{openModalState && (
				<Modal
					setOpenModalState={setOpenModalState}
					dateForm={dateForm}
					setDateForm={setDateForm}
					closeModal={openModal}
				/>
			)}
		</div>
	);
}

export default App;
