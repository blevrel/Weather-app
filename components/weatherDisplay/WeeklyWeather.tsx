import { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import weatherDescriptions from "../../utils/WeatherDescription";

const WeeklyWeatherComponent: React.FC<{}> = () => {
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
						{appContext.weekWeather?.time.map((day: string, index: number) => {
							return (
								<View key={index} style={styles.textContainer}>
									<Text style={styles.text}>{day}</Text>
									<Text style={styles.text}>
										{appContext.weekWeather?.temperature_2m_min[index]} °C
									</Text>
									<Text style={styles.text}>
										{appContext.weekWeather?.temperature_2m_max[index]} °C
									</Text>
									<Text style={{ fontSize: 12 }}>
										{weatherDescriptions.get(
											appContext.weekWeather?.weather_code[index]
										)}
									</Text>
								</View>
							);
						})}
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
	tableContainer: {
		display: "flex",
		flex: 1,
	},
	title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
	text: { fontSize: 15, fontWeight: "bold", textAlign: "center" },
	textContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
});

export default WeeklyWeatherComponent;
