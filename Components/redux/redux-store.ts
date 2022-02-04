import {applyMiddleware, combineReducers, createStore, Action, Store} from 'redux';
// @ts-ignore
import productsReducer, {InitialStateInterface, ProductsDataType} from './products-Reducer.ts';
import  { ThunkAction } from 'redux-thunk'
import createSagaMiddleware from "@redux-saga/core";
// @ts-ignore
import {watchDispatchSaga} from './rootSaga.ts';



// interface RootState {
//     products: InitialStateInterface
// }
// Store<RootState>

const sagaMiddleware = createSagaMiddleware();

let rootReducers: any = combineReducers({
    products: productsReducer
})
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
// const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

 sagaMiddleware.run(watchDispatchSaga);

export type AppStateType = ReturnType<typeof rootReducers>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R= Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
/*это берется в документации там описывается типизация и эти значения для санок, если асинхронщина то есть промис, есть РутСтейт,
unknown не ясно что, и ActionsTypes. A - ActionType, R -<Promise<void>(взвращаемое значение ) */

export default store;