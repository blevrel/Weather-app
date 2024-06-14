type CurrentWeatherType = {
	temperature_2m: number;
	weather_code: number;
	wind_speed_10m: number;
};

type HourlyWeatherType = {
	time: [string];
	temperature_2m: [number];
	weather_code: [number];
	wind_speed_10m: [number];
};

export type TodayWeatherType = {
	current: CurrentWeatherType;
	hourly: HourlyWeatherType;
};
