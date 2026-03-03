import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";
type SearchBoxProps = {
	searchQuery: string;
	setSearchQuery: (value: string) => void;
};

function SearchBox({ setSearchQuery, searchQuery }: SearchBoxProps) {
	const updateSearchQuery = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value), 300);

	return (
		<input
			className={css.input}
			type="text"
			placeholder="Search notes"
			defaultValue={searchQuery}
			onChange={updateSearchQuery}
		/>
	);
}

export default SearchBox;
