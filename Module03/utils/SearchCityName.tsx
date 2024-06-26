import { AppContextType } from "../types/AppContextType";
import { GeolocationResponse } from "../types/GeolocationReponse";
import { getTodayWeather, getWeekWeather } from "./ApiCalls";

const searchCityName = async (appContext: AppContextType) => {
	const cityName: string = appContext.searchInput;
	if (!cityName || cityName.length < 1 || appContext.connectionFailed) {
		return;
	}

	if (!appContext.suggestions) {
		const cityDoesNotExist: GeolocationResponse = {
			name: cityName + " not found",
			country: "",
			admin1: "",
		};
		appContext.setSelectedCity(cityDoesNotExist);
		appContext.setMethod("none");
		return;
	}
	const firstCityInArray: GeolocationResponse = appContext.suggestions[0];

	appContext.setIsWeatherLoading(true);
	appContext.setSelectedCity(firstCityInArray);
	appContext.setMethod("search");
	appContext.setSearchInput("");
	appContext.setSuggestions([]);
	await getTodayWeather(firstCityInArray)
		.then((currentWeather) => {
			appContext.setTodayWeather(currentWeather);
		})
		.catch((err) => {
			appContext.setConnectionFailed(true);
			appContext.setIsWeatherLoading(false);
			console.error(err);
			return;
		});
	await getWeekWeather(firstCityInArray)
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

export default searchCityName;
