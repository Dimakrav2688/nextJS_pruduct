import React from "react";
import {Router, useRouter} from "next/router";
import Head from "next/head";
import Shop from "../Components/Shop/ShopContainer.tsx";
// import {useDispatch} from "react-redux";


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