import {
	ParamListBase,
	TabNavigationState,
	TypedNavigator,
} from "@react-navigation/native";
import { TabProps } from "../props/TabProps";
import {
	MaterialTopTabNavigationOptions,
	MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";

export type TopTabNavigator = TypedNavigator<
	ParamListBase,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationOptions,
	MaterialTopTabNavigationEventMap,
	({
		id,
		initialRouteName,
		backBehavior,
		children,
		screenListeners,
		screenOptions,
		...restWithDeprecated
	}: TabProps) => JSX.Element
>;
