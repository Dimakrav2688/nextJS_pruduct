import '../styles/globals.css'
import Header from "../Components/infoComponent/Headers.tsx";
import {Provider} from "react-redux";
import store from "../Components/redux/redux-store.ts";

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

