import { Jelly } from "@uiball/loaders";
import css from "./Loader.module.scss";

type Props = {
	isLoading: boolean;
};

export default function Loader({ isLoading }: Props) {
	return (
		<div className={css.backdrop} aria-live="polite" aria-busy={isLoading}>
			<Jelly color="rgb(24, 166, 166)" size={200} speed={0.6} />
		</div>
	);
}
