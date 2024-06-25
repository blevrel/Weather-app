import { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import weatherDescriptions from "../../utils/WeatherDescription";
import weatherDescriptionsIcons from "../../utils/WeatherDescriptionIcons";
import { SvgUri } from "react-native-svg";

const CurrentWeatherComponent: React.FC<{}> = () => {
	const appContext = useContext(AppContext);

	if (appContext.method === "none") {
		return (
			<View>
				<Text style={styles.title}>Search a city or use geolocation</Text>
			</View>
		);
	}
	if (
		appContext.permission ||
		(!appContext.permission && appContext.method === "search")
	) {
		return (
			<View>
				{appContext.isWeatherLoading ? (
					<ActivityIndicator color="black" size="large"></ActivityIndicator>
				) : (
					<View style={styles.weatherDataContainer}>
						<Text style={styles.temperatureText}>
							{appContext.todayWeather?.current.temperature_2m} °C
						</Text>
						<Text style={styles.weatherDescription}>
							{weatherDescriptions.get(
								appContext.todayWeather?.current.weather_code
							)}
						</Text>
						<SvgUri
							height="200"
							width="200"
							uri={getIconUri(appContext.todayWeather?.current.weather_code)}
						/>
						<View style={styles.windSpeedContainer}>
							<Text style={styles.windSpeed}>
								{appContext.todayWeather?.current.wind_speed_10m} km/h
							</Text>
							<SvgUri
								height="50"
								width="50"
								uri={"https://www.svgrepo.com/show/427027/weather-icons-57.svg"}
							/>
						</View>
					</View>
				)}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
	windSpeedContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	temperatureText: {
		fontSize: 40,
		fontWeight: "bold",
		textAlign: "center",
		color: "purple",
	},
	weatherDataContainer: {
		flexGrow: 0.3,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	weatherDescription: {
		fontSize: 25,
		fontWeight: "bold",
		textAlign: "center",
		color: "purple",
	},
	windSpeed: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		color: "purple",
	},
});

const getIconUri = (code: number | undefined) => {
	if (code != undefined) {
		return weatherDescriptionsIcons.get(code) ?? null;
	}
	return null;
};

export default CurrentWeatherComponent;
