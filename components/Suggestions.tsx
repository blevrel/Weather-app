import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import selectCityFromList from "../utils/SelectCityFromList";
import { GeolocationResponse } from "../types/GeolocationReponse";
import { AppContextType } from "../types/AppContextType";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const SuggestionsComponent = () => {
	const appContext: AppContextType = useContext(AppContext);

	if (appContext.suggestions && appContext.suggestions.length) {
		if (appContext.isSuggestionLoading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator color="black" size="large"></ActivityIndicator>
				</View>
			);
		}
		return (
			<ScrollView
				keyboardShouldPersistTaps="always"
				keyboardDismissMode="on-drag"
				style={styles.container}
			>
				{appContext.suggestions.map(
					(city: GeolocationResponse, index: React.Key) => {
						if (city.name && city.admin1 && city.country) {
							return (
								<TouchableOpacity
									onPress={() => selectCityFromList(city, appContext)}
									key={index}
									style={styles.citySuggestion}
								>
									<Text>
										{city.name}
										{city.admin1 || city.country ? ", " : null}
										{city.admin1}
										{city.admin1 && city.country ? ", " : null}
										{city.country}
									</Text>
								</TouchableOpacity>
							);
						}
					}
				)}
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 95,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: "white",
	},
	loadingContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 95,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: "white",
		flex: 1,
	},
	citySuggestion: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 3,
		marginRight: 3,
		padding: 3,
		borderColor: "black",
		borderWidth: 3,
		borderRadius: 10,
		borderStyle: "solid",
		backgroundColor: "#e8eced",
	},
});

export default SuggestionsComponent;
