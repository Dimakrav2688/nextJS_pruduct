import {Head, Html, Main, NextScript} from 'next/document'
import React from "react";

export default function MyDocument() {
    return (
        <Html>
            <Head>
                <title>Store products of Amazon</title>
                <meta name='Products Amazon' content='product, amazon, ukraine'/>
                <meta name='description' content='store products'/>
                <meta charSet='utf-8'/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}