import React from "react";
import {useRouter} from "next/router";
import Shop from "../Components/Shop/ShopContainer.tsx";



const HomePage = () => {
    const router = useRouter()
    // const dispatch = useDispatch()


    return (
        <React.Fragment>
            <Shop/>
        </React.Fragment>
    )
}

export default HomePage