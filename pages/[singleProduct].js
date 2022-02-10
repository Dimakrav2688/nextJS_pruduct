import React from 'react';
import Head from 'next/head'
import {useRouter} from "next/router";
import Product from "../Components/Shop/Product.tsx";


const SinglePage = ({product}) => {

    const router = useRouter();

    return (
        <div>
            <Head>
                <title>Store products of Amazon</title>
                <meta name='og:title' content={product.name}/>
                <meta name='twitter:title' content={product.name}/>
                <meta name='description' content='By best product in Amazon shop! iphone. ipad. product for home'/>
                <meta name='Robots' content=''/>
                 <meta charSet='utf-8'/>
            </Head>
            <Product product={product}/>
        </div>
    );
};

export async function getServerSideProps(context) {

    const res = await fetch('https://61f10fa1072f86001749efdc.mockapi.io/api/products/products')
    const data = await res.json()

    const product = data.products.find(dataProduct => dataProduct.asin === context.query.singleProduct)
console.log(context)
    return {props: {product}}
}

export default SinglePage;