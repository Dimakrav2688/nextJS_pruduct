import {call, put} from 'redux-saga/effects';
// @ts-ignore
import productsAPI from "../../API/api.ts";
// @ts-ignore
import {ActionTypes} from "./actionTypes.ts";
import {takeLatest} from "@redux-saga/core/effects";
// EFFECTS Функции создающие объекты/ у которых описаны инструкции выполнения действий
// который выполняются самой redux-saga-middleware / ефект прокидывает в редакс сагу инструкции которые ей нужно выполнять/
// {take} ефект который саге указывает middleware ждать выполнения указного действия (диспатч) в даном случае он сработает при вызове дистпатча/ Но передавать прийдется в воркер сагу yield workerSaga();
// {call} Выполняет переданую функцию/ Если функция вернет promise/ приостанавливает сагу до тех пор/ пока promise не вызовет resolve/
// Методы
// takeEvery не рабочий вариант не ясен синтаксис выполняет сразу срабатываение когда вызывается диспатч и прокидывание в workerSaga на КАЖДЫЙ ВЫЗОВ ДИСПАТЧА/
// {takeLatest} автоматически отменяет любую предыдущую задачу саги/ запущеную ранее/ если она все еще выполняется/
// {takeLeading} Автоматические отменяет любую следующую задачу саги/ запущеную позднее/ если  первая запущеная не выполняется/
// {put} Вызывает dispatch c переданым action/
// {fork} эфект который указывает middleware выполнить неблокирующий вызов переданой функции
// {spawn} Создает паралельную задачу в корне саги/ сам процесс не привязан к родителю/


async function getArrayData () {
    return await productsAPI.getProducts()
    // const request = await fetch('https://61f10fa1072f86001749efdc.mockapi.io/api/products/products') но fetch возращает стринг по этому надо const data = await request.json()
}

export function* workerSaga(): Generator {
    const data = yield call(getArrayData)
    yield put({type: ActionTypes.SET_PRODUCTS, payload: data});
}

export function* watchDispatchSaga() {
    yield takeLatest(ActionTypes.FETCH_PRODUCT_DATA, workerSaga)
}

// export default function* rootSaga() {
//     yield watchDispatchSaga()
// }
//

// export function* workerSaga() {
// // workerSaga выполняет бизнес логику (запрос/таймаут/запись в кэш и т д)
//
// }

///////////////////////////

// export function* watchDispatchSaga() {
// // Saga Watcher  Следит за  dispatch`ем экшена в приложении и запускает worker
//     yield take('getArrayData')
//     yield workerSaga();
// // вызов с прокидыванием диспатча в воркер сагу/но нужно вызвать другим действием workerSaga что бы заработала бизнес логика диспатча
//
//     yield takeEvery('getArrayData', workerSaga)
// // выполняет сразу срабатываение когда вызывается диспатч и прокидывание в workerSaga улучшеный вариант предыдущего
//     yield takeEvery('getArrayData', workerSaga)
// //автоматически отменяет любую предыдущую задачу саги/ запущеную ранее/ если она все еще выполняется/ например если юзер кликает на кнопку много раз и вызывается диспатч этим то будет последнее действие/
//
// }

///////////////////////////////

// export default function* rootSaga() {
// // rootSaga запускает Saga Watcher
//     yield watchDispatchSaga()
// }