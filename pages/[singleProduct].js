import React from 'react';
import Head from 'next/head'
import {useRouter} from "next/router";
import Product from "../Components/Shop/Product.tsx";


const SinglePage = ({product}) => {

    const router = useRouter();
    const key = router.query.singleProduct;
    return (
        <div>
            <Head>
                <title>Store products of Amazon</title>
                <meta name='Products Amazon' content='product, amazon, ukraine'/>
                <meta name='description' content='store products'/>
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

    return {props: {product}}
}

export default SinglePage;