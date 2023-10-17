import { useSelector, useDispatch } from "react-redux";

import { selectFilter } from "../../redux/selectors";
import { setFilter } from "../../redux/slices/filterSlice";

import css from "./Filter.module.scss";
import { AppDispatch } from "../../@types/reduxTypes";

function Filter() {
	const filter = useSelector(selectFilter);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div>
			<h2 className={css.subtitle}>Find contact by name</h2>
			<label className={css.label}>
				<input
					value={filter}
					onChange={({ currentTarget }) => dispatch(setFilter(currentTarget.value))}
					className={css.input}
					type="text"
					name="filter"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
				/>
			</label>
		</div>
	);
}

export default Filter;
