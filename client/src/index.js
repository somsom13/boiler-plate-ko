import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
//위의 두 import는 promise, function으로 전송되는 action을 redux store에서 처리하는데 도와주기 위해 사용

import 'antd/dist/antd.css';
import Reducer from './_reducers';//reducers에 있는 index에서 reducer를 가져온다! 

const createStoreWithMiddleware=applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);
ReactDOM.render(
  //여기에 보여주고 싶은 컴포넌트를 넣어주면 된다!!!!! 
  //strict랑 providor가 뭘까?? 
  <React.StrictMode>
     <Provider 
        store={createStoreWithMiddleware(Reducer,
          window._REDUX_DEVTOOLS_EXTENSION_&&window._REDUX_DEVTOOLS_EXTENSION_()
          //window로 부터 redux devtool 확장을 가져와 사용
          )}
      > 
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')//html파일에서 root라는 element를 가져와 보여준다
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
