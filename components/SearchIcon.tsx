import { TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import searchCityName from "../utils/SearchCityName";
import { AppContextType } from "../types/AppContextType";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const SearchIconComponent = ({}) => {
	const appContext: AppContextType = useContext(AppContext);
	return (
		<View>
			<TouchableOpacity onPress={() => searchCityName(appContext)}>
				<MaterialCommunityIcons name="send" size={30}></MaterialCommunityIcons>
			</TouchableOpacity>
		</View>
	);
};

export default SearchIconComponent;
