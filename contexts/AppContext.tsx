import { PropsWithChildren, createContext, useState } from "react";
import { GeolocationResponse } from "../types/GeolocationReponse";
import { AppContextType } from "../types/AppContextType";
import { WeekWeatherType } from "../types/WeekWeatherType";
import { TodayWeatherType } from "../types/TodayWeatherType";

const initialState: AppContextType = {
	searchInput: "",
	setSearchInput: () => {},
	suggestions: [],
	setSuggestions: () => {},
	todayWeather: undefined,
	setTodayWeather: () => {},
	weekWeather: undefined,
	setWeekWeather: () => {},
	method: "none",
	setMethod: () => {},
	selectedCity: undefined,
	setSelectedCity: () => {},
	isWeatherLoading: false,
	setIsWeatherLoading: () => {},
	isSuggestionLoading: false,
	setIsSuggestionLoading: () => {},
	permission: false,
	setPermission: () => {},
	connectionFailed: false,
	setConnectionFailed: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = ({ children }: PropsWithChildren) => {
	const [selectedCity, setSelectedCity] = useState<GeolocationResponse>();
	const [searchInput, setSearchInput] = useState<string>("");
	const [suggestions, setSuggestions] = useState<
		GeolocationResponse[] | undefined
	>([]);
	const [todayWeather, setTodayWeather] = useState<TodayWeatherType>();
	const [weekWeather, setWeekWeather] = useState<WeekWeatherType>();
	const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
	const [isSuggestionLoading, setIsSuggestionLoading] =
		useState<boolean>(false);
	const [method, setMethod] = useState<"search" | "geolocation" | "none">(
		"none"
	);
	const [permission, setPermission] = useState<boolean>(true);
	const [connectionFailed, setConnectionFailed] = useState<boolean>(false);

	return (
		<AppContext.Provider
			value={{
				searchInput,
				setSearchInput,
				suggestions,
				setSuggestions,
				todayWeather,
				setTodayWeather,
				weekWeather,
				setWeekWeather,
				method,
				setMethod,
				selectedCity,
				setSelectedCity,
				isWeatherLoading,
				setIsWeatherLoading,
				isSuggestionLoading,
				setIsSuggestionLoading,
				permission,
				setPermission,
				connectionFailed,
				setConnectionFailed,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
