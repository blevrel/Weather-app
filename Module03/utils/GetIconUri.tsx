import weatherDescriptionsIcons from "./WeatherDescriptionIcons";

const getIconUri = (code: number | undefined) => {
	if (code != undefined) {
		return weatherDescriptionsIcons.get(code) ?? null;
	}
	return null;
};

export default getIconUri;
