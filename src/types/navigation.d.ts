import { NavigatorScreenParams } from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      '(tabs)': NavigatorScreenParams<TabParamList>;
      'note/[id]': { id: string };
      'note/new': undefined;
      '(auth)/sign-in': undefined;
      '(auth)/sign-up': undefined;
    }

    interface TabParamList {
      index: undefined;
      explore: undefined;
    }
  }
}
