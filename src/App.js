import { Provider } from 'react-redux';
import store from './app/redux/store';
import { RootScreen } from './app/screens';

function App() {
  return (
    <>
      <Provider store={store}>
        <RootScreen/>
      </Provider>
    </>
  );
}

export default App;
