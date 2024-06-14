import { GeolocationResponse } from "../types/GeolocationReponse";
import { TodayWeatherType } from "../types/TodayWeatherType";
import { WeekWeatherType } from "../types/WeekWeatherType";

export async function getTodayWeather(city: GeolocationResponse) {
	const url: string = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,wind_speed_10m&timezone=auto&forecast_days=1`;
	const response: TodayWeatherType = await (await fetch(url)).json();

	return response;
}

export async function getWeekWeather(city: GeolocationResponse) {
	const url: string = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
	const response: { daily: WeekWeatherType } = await (await fetch(url)).json();

	return response.daily;
}

export async function getCitiesByName(input: string) {
	const url: string = `https://geocoding-api.open-meteo.com/v1/search?name=${input}`;
	const response: { results: GeolocationResponse[] } = await (
		await fetch(url)
	).json();

	return response.results;
}
