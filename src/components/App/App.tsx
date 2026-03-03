import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import ReactPaginate from "react-paginate";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import NoteForm from "../NoteForm/NoteForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { noteService } from "../../services/noteService";

function App() {
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [openModalState, setOpenModalState] = useState(false);

	const { data } = useQuery({
		queryKey: ["myQueryKey", searchQuery, page],
		queryFn: () => noteService(searchQuery, page),
		placeholderData: keepPreviousData,
	});

	const toggleModal = () => setOpenModalState((p) => !p);

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setPage(1);
	};

	const totalPages = data?.totalPages ?? 1;

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox
					value={searchQuery}
					onChange={handleSearchChange}
				/>

				{totalPages > 1 && (
					<ReactPaginate
						pageCount={totalPages}
						pageRangeDisplayed={5}
						marginPagesDisplayed={1}
						onPageChange={({ selected }) => setPage(selected + 1)}
						forcePage={page - 1}
						containerClassName={css.pagination}
						activeClassName={css.active}
						nextLabel="→"
						previousLabel="←"
					/>
				)}

				<button
					onClick={toggleModal}
					className={css.button}
				>
					Create note +
				</button>
			</header>

			<NoteList notes={data?.notes ?? []} />
			{openModalState && (
				<Modal closeModal={toggleModal}>
					<NoteForm closeModal={toggleModal} />
				</Modal>
			)}
		</div>
	);
}

export default App;
