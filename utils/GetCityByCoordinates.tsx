import * as Location from "expo-location";
import { AppContextType } from "../types/AppContextType";
import { CoordsType } from "../types/CoordsType";
import { GeolocationResponse } from "../types/GeolocationReponse";
import { getTodayWeather, getWeekWeather } from "./ApiCalls";

const getCityByCoordinates = async (appContext: AppContextType) => {
	appContext.setConnectionFailed(false);
	appContext.setMethod("geolocation");
	appContext.setIsWeatherLoading(true);
	const isLocationAllowed: boolean = await getPermissions(appContext);
	if (!isLocationAllowed) {
		return;
	}
	const coordinates: CoordsType | undefined = await getCurrentPosition();
	if (!coordinates) {
		appContext.setIsWeatherLoading(false);
		appContext.setMethod("none");
		return;
	}
	const cityObj: GeolocationResponse = {
		name: "Current location",
		country: "",
		admin1: "",
		latitude: coordinates.latitude,
		longitude: coordinates.longitude,
	};

	getWeatherData(appContext, cityObj);
};

const getPermissions = async (appContext: AppContextType): Promise<boolean> => {
	const { status }: Location.LocationPermissionResponse =
		await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		appContext.setPermission(false);
		appContext.setIsWeatherLoading(false);
		return false;
	}
	return true;
};

const getCurrentPosition = async (): Promise<CoordsType | undefined> => {
	let coordinates: Location.LocationObjectCoords | undefined;
	await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
		.then((location) => (coordinates = location?.coords))
		.catch(() => {
			Location.getLastKnownPositionAsync({ requiredAccuracy: 6 }).then(
				(location) => (coordinates = location?.coords)
			);
		});
	if (!coordinates) {
		return;
	}
	const coords: CoordsType = {
		latitude: coordinates?.latitude,
		longitude: coordinates?.longitude,
	};
	return coords;
};

const getWeatherData = async (
	appContext: AppContextType,
	cityObj: GeolocationResponse
) => {
	appContext.setSelectedCity(cityObj);
	appContext.setSearchInput("");
	appContext.setSuggestions([]);
	await getTodayWeather(cityObj)
		.then((todayWeather) => {
			appContext.setTodayWeather(todayWeather);
		})
		.catch((err) => {
			appContext.setConnectionFailed(true);
			appContext.setIsWeatherLoading(false);
			console.error(err);
			return;
		});
	await getWeekWeather(cityObj)
		.then((weekWeather) => {
			appContext.setWeekWeather(weekWeather);
			appContext.setIsWeatherLoading(false);
		})
		.catch((err) => {
			appContext.setConnectionFailed(true);
			appContext.setIsWeatherLoading(false);
			console.error(err);
			return;
		});
};

export default getCityByCoordinates;
