import { NavigatorScreenParams } from '@react-navigation/native';

type RootStackParamList = {
  '(tabs)': NavigatorScreenParams<TabParamList>;
  'note/[id]': { id: string };
  'note/new': undefined;
  '(auth)/sign-in': undefined;
  '(auth)/sign-up': undefined;
};

type TabParamList = {
  index: undefined;
  explore: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
