import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import CurrentWeatherComponent from "../components/weatherDisplay/CurrentWeather";
import { LabelEnum } from "../types/enums/LabelEnum";
import TodayWeatherComponent from "../components/weatherDisplay/TodayWeather";
import WeeklyWeatherComponent from "../components/weatherDisplay/WeeklyWeather";

const ScreenTemplate: React.FC<{ label: LabelEnum }> = ({ label }) => {
	const appContext = useContext(AppContext);
	const selectedCity = appContext.selectedCity;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				keyboardDismissMode="on-drag"
				contentContainerStyle={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-evenly",
					flexGrow: 1,
					marginTop: 10,
					marginBottom: 10
				}}
			>
				{selectedCity && !appContext.connectionFailed ? (
					<View>
						<Text style={styles.title}>{selectedCity.name}</Text>
						<Text style={styles.text}>{selectedCity.admin1}</Text>
						<Text style={styles.text}>{selectedCity.country}</Text>
					</View>
				) : null}
				{
					<View style={styles.weatherData}>
						{appContext.method === "geolocation" && !appContext.permission ? (
							<Text style={styles.errorMessage}>
								You have not given permission for geolocation. Go to your app
								settings to enable it
							</Text>
						) : (
							selectView(label, appContext.connectionFailed)
						)}
					</View>
				}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	weatherData: {
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	errorMessage: {
		fontSize: 20,
		color: "purple",
		fontWeight: "bold",
		textAlign: "center",
		padding: 10,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
		color: "purple",
	},
	text: { fontSize: 20, textAlign: "center" },
});

function selectView(label: LabelEnum, connectionFailed: boolean) {
	if (connectionFailed) {
		return (
			<Text style={styles.errorMessage}>
				Connection to service failed, check your internet connection or try
				again later
			</Text>
		);
	}
	if (label === LabelEnum.CURRENT) {
		return <CurrentWeatherComponent></CurrentWeatherComponent>;
	}
	if (label === LabelEnum.TODAY) {
		return <TodayWeatherComponent></TodayWeatherComponent>;
	}
	if (label === LabelEnum.WEEKLY) {
		return <WeeklyWeatherComponent></WeeklyWeatherComponent>;
	}
}
export default ScreenTemplate;
