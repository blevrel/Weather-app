import "react-native-url-polyfill/auto";
import { StyleSheet, View } from "react-native";
import TabNavigationContainer from "./components/TabNavigationContainer";
import SearchbarComponent from "./components/SearchBar";
import GeolocationComponent from "./components/Geolocation";
import SuggestionsComponent from "./components/Suggestions";
import SearchIconComponent from "./components/SearchIcon";
import { AppProvider } from "./contexts/AppContext";

const weather_proj: () => React.JSX.Element = () => {
	return (
		<AppProvider>
			<View style={styles.container}>
				<View style={styles.topbar}>
					<SearchbarComponent></SearchbarComponent>
					<SearchIconComponent></SearchIconComponent>
					<GeolocationComponent></GeolocationComponent>
				</View>
				<TabNavigationContainer />
				<SuggestionsComponent></SuggestionsComponent>
			</View>
		</AppProvider>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	topbar: { flexDirection: "row", paddingTop: 30, alignItems: "center" },
});

export default weather_proj;
