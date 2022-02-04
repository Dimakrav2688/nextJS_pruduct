// @ts-ignore
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// @ts-ignore
import {actions, getArrayData, InitialStateInterface, ProductsDataType} from '../redux/products-Reducer.ts';
// @ts-ignore
import Product from './Product.tsx';
// @ts-ignore
import style from './style.module.css'
// @ts-ignore
import SearchForm from './SearchForm.tsx'
// @ts-ignore
import {useLocation} from "react-router-dom";
import {Grid} from "@mui/material";
import {AppStateType} from "../redux/redux-store";
import  {StringParam, useQueryParams, useQueryParam, withDefault,ArrayParam} from "use-query-params";
import {useFormik} from "formik";
import * as yup from "yup";
// @ts-ignore
import {getDataAction} from "../redux/actionTypes.ts";
import {useRouter} from "next/router";

interface MyFormValues {
    product: string;
    category: string;
}
const validationSchema = yup.object().shape({
    product: yup.string().min(3, 'Write 3 characters')
})


const Shop = () => {
   const router = useRouter();

    const productsData = useSelector((state: AppStateType) => state.products.productsData)
    const categoriesData = useSelector((state: AppStateType) => state.products.categories)
    const dispatch = useDispatch()

    const changeUrl = () => {
        window.location.search = '';
    }

    const formik = useFormik({
        initialValues: {product: router.query.product || '', category: router.query.category || ''},
        onSubmit: (values: MyFormValues) => {
            dispatch(actions.setSearch(values.product))

        },
        validationSchema
    })

    const [filteredArr, setFilteredArr] = useState([])

    useEffect(() => {
        if(!productsData.length) {
            dispatch(getDataAction())
        }
    }, [])
    useEffect(() => {
        const includeCategory = formik.values.category === "All category"
        const updatedProducts = productsData.filter((product: ProductsDataType) => product.name.includes(formik.values.product) && (includeCategory ?  true : product.bsr_category.includes(formik.values.category)))
        setFilteredArr(updatedProducts)

        // if (formik.values.category && formik.values.product) {
        //     const filteredByCategory = formik.values.category === "All category"
        //       ? productsData
        //       : productsData.filter((product: ProductsDataType) =>
        //         product.bsr_category.includes(formik.values.category))
        //     setFilteredArr(filteredByCategory.filter((product: ProductsDataType) => product.name.includes(formik.values.product)))
        // }
        // // else if (query.product) {
        // //     setFilteredArr(productsData.filter((product: ProductsDataType) => product.asin.includes(query.product)))
        // // }
        // else if (formik.values.category === "All category") {
        //     setFilteredArr(productsData)
        // }
        // else if (formik.values.category && !formik.values.product) {
        //     setFilteredArr(productsData.filter((product: ProductsDataType) => product.bsr_category.includes(formik.values.category)))
        // }
        // else if (formik.values.product && formik.values.category === "All category") {
        //     setFilteredArr(productsData.filter((product: ProductsDataType) => product.name.includes(formik.values.product)))
        // }
        // else setFilteredArr(productsData.filter((product: ProductsDataType) => product.name.includes(formik.values.product)))
    }, [formik.values, productsData, router.query])

    return (
        <div className={style.mainStyleContainer}>
            <div className={style.searchInput}>
                <SearchForm query={router.query.query} setQuery={() => {}} formik={formik} changeUrl={changeUrl}
                             categoriesData={categoriesData}/>
            </div>
            <div className={style.product}>
                <Grid container spacing={3}>
                    {((formik.values.category || formik.values.product || router.query) ? filteredArr : productsData)
                        .map((product: ProductsDataType) => <Product key={product.asin} product={product}/>)}
                </Grid>
            </div>
        </div>
    )
}

export default Shop






