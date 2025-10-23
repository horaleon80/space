import { useDispatch, useSelector } from 'react-redux';

interface UserState {
  name: string;
  theme: 'light' | 'dark';
}

interface RootState {
  user: UserState;
}

export const useSafeDispatch = () => {
  try {
    return useDispatch();
  } catch (error) {
    console.warn('Redux not available - running in standalone mode');
    return null;
  }
};

export const useSafeSelector = <T,>(selector: (state: RootState) => T, defaultValue: T): T => {
  try {
    return useSelector(selector);
  } catch (error) {
    console.warn('Redux not available - using default value');
    return defaultValue;
  }
};