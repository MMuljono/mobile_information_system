/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Create: undefined;
  List: undefined;
  Profile: { login: boolean };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type FormDataInput = {
  email: string;
  registerEmail: string;
  username: string;
  password: string;
  registerPassword: string;
  registerPasswordConfirm: string;
};

export type FormEventInput = {
  max: string;
  type: string;
  dateTime: Date;
  address: string;
  postcode: string;
  city: string;
  description: string;
  contactInfo: string;
};

export type EventData = {
  address: string;
  city: string;
  contactInfo: string;
  createdAt: string;
  creatorId: number;
  dateTime: string;
  description: string;
  id: number;
  latitude: number;
  longtitude: number;
  max: number;
  postcode: number;
  type: string;
};
