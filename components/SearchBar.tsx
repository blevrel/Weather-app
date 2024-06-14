import { SearchBar } from "@rneui/themed";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { getCitiesByName } from "../utils/ApiCalls";

const SearchbarComponent = () => {
	const appContext = useContext(AppContext);

	const updateSearchValue: (text: string) => void = async (text: string) => {
		appContext.setSearchInput(text);
		appContext.setIsSuggestionLoading(true);
		await getCitiesByName(text)
			.then((cities) => {
				appContext.setConnectionFailed(false);
				appContext.setIsSuggestionLoading(false);
				appContext.setSuggestions(cities);
			})
			.catch((err) => {
				appContext.setConnectionFailed(true);
				appContext.setIsSuggestionLoading(false);
				appContext.setConnectionFailed(true);
				console.error(err);
			});
	};

	return (
		<SearchBar
			platform="android"
			placeholder="Search location..."
			onChangeText={updateSearchValue}
			value={appContext.searchInput}
			containerStyle={{
				flex: 20,
			}}
		/>
	);
};

export default SearchbarComponent;
