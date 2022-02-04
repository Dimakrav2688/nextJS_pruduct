import '../styles/globals.css'
import Header from "../Components/infoComponent/Headers.tsx";
import {Provider} from "react-redux";
import store from "../Components/redux/redux-store.ts";
// import Shop from "../Components/Shop/ShopContainer";
// import {MyAppProps} from 'next/app';
// import store from '../redux/store'


function MyApp({Component, pageProps}) {
    return (
        <>
            <Provider store={store}>
                <Header/>

                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp;


// можем добавить глобальные стили CSS
//     <style jsx> {``}
//
//     </style>
// }

