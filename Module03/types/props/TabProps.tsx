import {
	MaterialTopTabNavigationEventMap,
	MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { MaterialTopTabNavigationConfig } from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import {
	DefaultNavigatorOptions,
	ParamListBase,
	TabNavigationState,
	TabRouterOptions,
} from "@react-navigation/native";

export type TabProps = DefaultNavigatorOptions<
	ParamListBase,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationOptions,
	MaterialTopTabNavigationEventMap
> &
	TabRouterOptions &
	MaterialTopTabNavigationConfig;
