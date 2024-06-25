import { SearchBar } from "@rneui/themed";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { getCitiesByName } from "../utils/ApiCalls";
import { GeolocationResponse } from "../types/GeolocationReponse";

const SearchbarComponent = () => {
	const appContext = useContext(AppContext);

	const updateSearchValue: (text: string) => void = async (text: string) => {
		appContext.setSearchInput(text);
		appContext.setIsSuggestionLoading(true);
		await getCitiesByName(text)
			.then((cities) => {
				const suggestions: GeolocationResponse[] | undefined =
					filterSuggestions(cities);
				appContext.setConnectionFailed(false);
				appContext.setIsSuggestionLoading(false);
				appContext.setSuggestions(suggestions);
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
				backgroundColor: "#ecdaef",
			}}
		/>
	);
};

const filterSuggestions = (suggestions: GeolocationResponse[]) => {
	if (suggestions) {
		for (let i = 0; i < suggestions.length; ++i) {
			if (
				!suggestions[i].country ||
				!suggestions[i].admin1 ||
				!suggestions[i].name
			) {
				suggestions.splice(i, 1);
			}
		}
		return suggestions;
	}
};

export default SearchbarComponent;
