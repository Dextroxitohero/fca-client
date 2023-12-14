import React from 'react';
import { Provider } from "react-redux";
import { Store } from './redux/store'

import { AppRouter } from './router/AppRouter';

export const App = () => {

	return (
		<Provider store={Store}>
			<AppRouter />
		</Provider>
	)
}
