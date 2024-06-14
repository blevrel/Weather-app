import { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import weatherDescriptions from "../../utils/WeatherDescription";

const CurrentWeatherComponent: React.FC<{}> = () => {
	const appContext = useContext(AppContext);

	if (appContext.method === "none") {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Search a city or use geolocation</Text>
			</View>
		);
	}
	if (
		appContext.permission ||
		(!appContext.permission && appContext.method === "search")
	) {
		return (
			<View style={styles.container}>
				{appContext.isWeatherLoading ? (
					<ActivityIndicator color="black" size="large"></ActivityIndicator>
				) : (
					<View style={styles.textContainer}>
						<Text style={styles.text}>
							{appContext.todayWeather?.current.temperature_2m} °C
						</Text>
						<Text style={styles.text}>
							{weatherDescriptions.get(
								appContext.todayWeather?.current.weather_code
							)}
						</Text>
						<Text style={styles.text}>
							{appContext.todayWeather?.current.wind_speed_10m} km/h
						</Text>
					</View>
				)}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
	text: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
	textContainer: {
		display: "flex",
		justifyContent: "space-between",
	},
});

export default CurrentWeatherComponent;
