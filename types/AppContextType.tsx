import { SetStateAction } from "react";
import { GeolocationResponse } from "./GeolocationReponse";
import { TodayWeatherType } from "./TodayWeatherType";
import { WeekWeatherType } from "./WeekWeatherType";

export type AppContextType = {
	searchInput: string;
	setSearchInput: React.Dispatch<React.SetStateAction<string>>;
	suggestions: GeolocationResponse[];
	setSuggestions: React.Dispatch<
		React.SetStateAction<GeolocationResponse[] | undefined>
	>;
	todayWeather: TodayWeatherType | undefined;
	setTodayWeather: React.Dispatch<
		React.SetStateAction<TodayWeatherType | undefined>
	>;
	weekWeather: WeekWeatherType | undefined;
	setWeekWeather: React.Dispatch<
		React.SetStateAction<WeekWeatherType | undefined>
	>;
	method: "search" | "geolocation" | "none";
	setMethod: React.Dispatch<SetStateAction<"search" | "geolocation" | "none">>;
	selectedCity: GeolocationResponse | undefined;
	setSelectedCity: React.Dispatch<
		SetStateAction<GeolocationResponse | undefined>
	>;
	isWeatherLoading: boolean;
	setIsWeatherLoading: React.Dispatch<SetStateAction<boolean>>;
	isSuggestionLoading: boolean;
	setIsSuggestionLoading: React.Dispatch<SetStateAction<boolean>>;
	permission: boolean;
	setPermission: React.Dispatch<SetStateAction<boolean>>;
	connectionFailed: boolean;
	setConnectionFailed: React.Dispatch<SetStateAction<boolean>>;
};
