import { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	useWindowDimensions,
} from "react-native";
import { AppContext } from "../../contexts/AppContext";
import { LineChart } from "react-native-chart-kit";
import { SvgUri } from "react-native-svg";
import getIconUri from "../../utils/GetIconUri";

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
					<View
						style={{
							flex: 1,
							display: "flex",
							alignItems: "center",
						}}
					>
						<WeekWeatherChart></WeekWeatherChart>
						<WeekWeatherScroll></WeekWeatherScroll>
					</View>
				)}
			</View>
		);
	}
};

const WeekWeatherChart: React.FC<{}> = () => {
	const appContext = useContext(AppContext);
	const screenWidth = useWindowDimensions().width;

	if (!appContext.weekWeather?.time) {
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
		labels: formatDateLabels(appContext.weekWeather.time),
		datasets: [
			{
				data: appContext.weekWeather?.temperature_2m_max,
				color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
			},
			{
				data: appContext.weekWeather?.temperature_2m_min,
				color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
			},
		],
		legend: ["Max temperature", "Min temperature"],
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

const WeekWeatherScroll: React.FC<{}> = () => {
	const appContext = useContext(AppContext);

	return (
		<ScrollView
			horizontal={true}
			contentContainerStyle={{
				height: 200,
			}}
		>
			{appContext.weekWeather?.time?.map((date: string, index: number) => {
				return (
					<View style={styles.weatherDataContainer} key={index}>
						<Text style={styles.dateText}>{formatDate(new Date(date))}</Text>
						<SvgUri
							height="100"
							width="100"
							uri={getIconUri(appContext.weekWeather?.weather_code[index])}
						/>
						<Text style={styles.maxTemperatureText}>
							{appContext.weekWeather?.temperature_2m_max[index]} °C +
						</Text>
						<Text style={styles.minTemperatureText}>
							{appContext.weekWeather?.temperature_2m_min[index]} °C -
						</Text>
					</View>
				);
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	weatherDataContainer: {
		flexGrow: 0.3,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	tableContainer: {
		display: "flex",
		flex: 1,
	},
	title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
	text: { fontSize: 15, fontWeight: "bold", textAlign: "center" },
	dateText: {
		fontSize: 17,
		fontWeight: "bold",
		textAlign: "center",
		color: "purple",
	},
	maxTemperatureText: {
		fontSize: 17,
		fontWeight: "bold",
		textAlign: "center",
		color: "red",
	},
	minTemperatureText: {
		fontSize: 17,
		fontWeight: "bold",
		textAlign: "center",
		color: "blue",
	},
	textContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
});

const formatDate = (date: Date) => {
	const day: string = String(date.getDate()).padStart(2, "0");
	const month: string = String(date.getMonth() + 1).padStart(2, "0");
	return `${day}/${month}`;
};

const formatDateLabels = (dates: string[]) => {
	const newArray: string[] = dates.map((date: string) => {
		const newDate: Date = new Date(date);
		const day: string = String(newDate.getDate()).padStart(2, "0");
		const month: string = String(newDate.getMonth() + 1).padStart(2, "0");
		return `${day}/${month}`;
	});
	return newArray;
};

export default WeeklyWeatherComponent;
