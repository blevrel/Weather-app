import { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import weatherDescriptions from "../../utils/WeatherDescription";

const TodayWeatherComponent: React.FC<{}> = () => {
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
					<View style={styles.tableContainer}>
						{appContext.todayWeather?.hourly.time.map(
							(hour: string, index: number) => {
								return (
									<View key={index} style={styles.textContainer}>
										<Text style={styles.text}>
											{formatTime(new Date(hour))}
										</Text>
										<Text style={styles.text}>
											{appContext.todayWeather?.hourly.temperature_2m[index]} °C
										</Text>
										<Text style={styles.text}>
											{appContext.todayWeather?.hourly.wind_speed_10m[index]}
											km/h
										</Text>
										<Text style={{ fontSize: 12 }}>
											{weatherDescriptions.get(
												appContext.todayWeather?.hourly.weather_code[index]
											)}
										</Text>
									</View>
								);
							}
						)}
					</View>
				)}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	tableContainer: {
		display: "flex",
		flex: 1,
	},
	textContainer: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

const formatTime = (date: Date) => {
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${hours}:${minutes}`;
};

export default TodayWeatherComponent;
