import { GeolocationResponse } from "../types/GeolocationReponse";
import { getTodayWeather, getWeekWeather } from "./ApiCalls";
import { AppContextType } from "../types/AppContextType";

const selectCityFromList = async (
	city: GeolocationResponse,
	appContext: AppContextType
) => {
	if (city === undefined || appContext.connectionFailed) {
		return;
	}
	appContext.setIsWeatherLoading(true);
	appContext.setSelectedCity(city);
	appContext.setMethod("search");
	appContext.setSearchInput("");
	appContext.setSuggestions([]);
	await getTodayWeather(city)
		.then((currentWeather) => {
			appContext.setTodayWeather(currentWeather);
		})
		.catch((err) => {
			appContext.setConnectionFailed(true);
			appContext.setIsWeatherLoading(false);
			console.error(err);
			return;
		});
	await getWeekWeather(city)
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

export default selectCityFromList;
