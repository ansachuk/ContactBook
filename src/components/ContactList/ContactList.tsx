import { useDispatch, useSelector } from "react-redux";

import { deleteContact } from "../../redux/operations";
import { selectFilteredContacts } from "../../redux/selectors";

import { Notify } from "notiflix";

import css from "./ContactList.module.scss";
import { AppDispatch } from "../../@types/reduxTypes";

const ContactList = () => {
	const filteredContacts = useSelector(selectFilteredContacts);
	const dispatch = useDispatch<AppDispatch>();

	const onDeleteContact = (id: string) => {
		Notify.failure("Contact deleted!");
		dispatch(deleteContact(id));
	};

	return (
		<ul className={css.list}>
			{filteredContacts?.length ? (
				filteredContacts.map(({ name, phone, id }) => (
					<li key={name} className={css.listItem}>
						<div>
							{name} : <span className={css.number}>{phone}</span>
						</div>
						<button
							className={css.deleteButton}
							onClick={() => {
								onDeleteContact(id);
							}}
						>
							Delete
						</button>
					</li>
				))
			) : (
				<p className={css.message}>You have no contacts yet!</p>
			)}
		</ul>
	);
};

export default ContactList;
