import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import getCityByCoordinates from "../utils/GetCityByCoordinates";
import { AppContextType } from "../types/AppContextType";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const GeolocationComponent: React.FC<{}> = () => {
	const appContext: AppContextType = useContext(AppContext);
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={!appContext.permission ? styles.disabled : null}
				disabled={!appContext.permission}
				onPress={() => {
					getCityByCoordinates(appContext);
				}}
			>
				<MaterialCommunityIcons
					name="map-marker"
					size={30}
				></MaterialCommunityIcons>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 17,
	},
	disabled: {
		opacity: 0.2,
	},
});

export default GeolocationComponent;
