import { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	useWindowDimensions,
	ScrollView,
} from "react-native";
import { AppContext } from "../../contexts/AppContext";
import { LineChart } from "react-native-chart-kit";
import { SvgUri } from "react-native-svg";
import getIconUri from "../../utils/GetIconUri";

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
					<View style={{ flex: 1 }}>
						<TodayWeatherChart></TodayWeatherChart>
						<TodayWeatherScroll></TodayWeatherScroll>
					</View>
				)}
			</View>
		);
	}
};

const TodayWeatherChart: React.FC<{}> = () => {
	const appContext = useContext(AppContext);
	const screenWidth = useWindowDimensions().width;

	if (!appContext.todayWeather?.hourly.time) {
		return;
	}
	const chartConfig = {
		backgroundGradientFrom: "#1E2923",
		backgroundGradientFromOpacity: 0.2,
		backgroundGradientTo: "#1E2923",
		backgroundGradientToOpacity: 0.2,
		color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
		barPercentage: 0.5,
	};
	const data = {
		labels: [
			"00:00",
			"03:00",
			"06:00",
			"09:00",
			"12:00",
			"15:00",
			"18:00",
			"21:00",
		],
		datasets: [
			{
				data: appContext.todayWeather?.hourly.temperature_2m,
				color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
			},
		],
		legend: ["Today temperatures"],
	};
	return (
		<LineChart
			data={data}
			width={screenWidth - 20}
			height={300}
			yAxisSuffix=" °C"
			chartConfig={chartConfig}
			style={{ borderRadius: 20 }}
		/>
	);
};

const TodayWeatherScroll: React.FC<{}> = () => {
	const appContext = useContext(AppContext);

	return (
		<ScrollView
			horizontal={true}
			contentContainerStyle={{
				height: 200,
			}}
		>
			{appContext.todayWeather?.hourly.time?.map(
				(time: string, index: number) => {
					return (
						<View style={styles.weatherDataContainer} key={index}>
							<Text style={styles.timeText}>{formatTime(new Date(time))}</Text>
							<SvgUri
								height="100"
								width="100"
								uri={getIconUri(
									appContext.todayWeather?.hourly.weather_code[index]
								)}
							/>
							<Text style={styles.temperatureText}>
								{appContext.todayWeather?.hourly.temperature_2m[index]} °C
							</Text>
							<View style={styles.windSpeedContainer}>
								<Text style={styles.windSpeed}>
									{appContext.todayWeather?.hourly.wind_speed_10m[index]} km/h
								</Text>
								<SvgUri
									height="30"
									width="30"
									uri={
										"https://www.svgrepo.com/show/427027/weather-icons-57.svg"
									}
								/>
							</View>
						</View>
					);
				}
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	timeText: {
		fontSize: 17,
		fontWeight: "bold",
		textAlign: "center",
		color: "purple",
	},
	temperatureText: {
		fontSize: 17,
		fontWeight: "bold",
		textAlign: "center",
		color: "purple",
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
	weatherDataContainer: {
		flexGrow: 0.3,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	windSpeed: {
		fontSize: 17,
		fontWeight: "bold",
		textAlign: "center",
		color: "purple",
	},
	windSpeedContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
});

const formatTime = (date: Date) => {
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${hours}:${minutes}`;
};

export default TodayWeatherComponent;
