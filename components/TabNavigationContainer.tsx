import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ScreenTemplate from "../screens/ScreenTemplate";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TopTabNavigator } from "../types/tabs/TopTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { LabelEnum } from "../types/enums/LabelEnum";

const Tab: TopTabNavigator = createMaterialTopTabNavigator();

const TabNavigationContainer = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName={LabelEnum.CURRENT}
				tabBarPosition="bottom"
				screenOptions={{
					tabBarActiveTintColor: "blue",
					tabBarInactiveTintColor: "grey",
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIconStyle: { alignItems: "center", justifyContent: "center" },
					tabBarAndroidRipple: { radius: 0 },
				}}
			>
				<Tab.Screen
					name={LabelEnum.CURRENT}
					options={{
						tabBarIcon({ color }) {
							return (
								<MaterialCommunityIcons
									name="clock"
									color={color}
									size={25}
								></MaterialCommunityIcons>
							);
						},
					}}
				>
					{() => <ScreenTemplate label={LabelEnum.CURRENT}></ScreenTemplate>}
				</Tab.Screen>
				<Tab.Screen
					name={LabelEnum.TODAY}
					options={{
						tabBarIcon({ color }) {
							return (
								<MaterialCommunityIcons
									name="calendar-today"
									color={color}
									size={25}
								></MaterialCommunityIcons>
							);
						},
					}}
				>
					{() => <ScreenTemplate label={LabelEnum.TODAY}></ScreenTemplate>}
				</Tab.Screen>
				<Tab.Screen
					name={LabelEnum.WEEKLY}
					options={{
						tabBarIcon({ color }) {
							return (
								<MaterialCommunityIcons
									name="calendar-week"
									color={color}
									size={25}
								></MaterialCommunityIcons>
							);
						},
					}}
				>
					{() => <ScreenTemplate label={LabelEnum.WEEKLY}></ScreenTemplate>}
				</Tab.Screen>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default TabNavigationContainer;