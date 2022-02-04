import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import * as yup from 'yup'
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
// @ts-ignore
import {actions} from '../redux/products-Reducer.ts';
// @ts-ignore
import TextField from '@mui/material/TextField';
// @ts-ignore
import style from './style.module.css'
import Button from "@mui/material/Button";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";
import {ArrayParam, StringParam, useQueryParam, useQueryParams, withDefault,} from 'use-query-params';
import {AppStateType} from "../redux/redux-store";

interface IQuery {
  category?: string;
  product?: string;
}

interface SearchFormPropsType {
  query: IQuery;
  setQuery: (query: IQuery) => void;
  changeUrl: () => void;
  filteredCategorySelector: string;
  categoriesData: string[];
  formik: any;
}


const SearchForm: React.FC<SearchFormPropsType> = ({
                                                     formik,
                                                     query,
                                                     setQuery,
                                                     changeUrl,
                                                     filteredCategorySelector,
                                                     categoriesData,
                                                   }: SearchFormPropsType) => {
  const dispatch = useDispatch()
  const [skipFirstRender, setSkipFirstRender] = useState(false)


  const {values, errors, touched, handleBlur, isValid, handleSubmit, dirty} = formik


  useEffect(() => {
    if (skipFirstRender) {
      handleSubmit()
    } else {
      setSkipFirstRender(true)
    }
  }, [formik.values])

  const searchStyle = {
    display: 'flex',
    transitionDuration: '0.3s',
    justifyContent: 'space-between'
  }
  const selectStyle = {
    width: '200px',

  }
  const buttonStyle = {
    height: "100%",
    transitionDuration: '0.3s',
  }
  // const [productQuery, setProductQuery] = useQueryParam('product', StringParam)
  // const [categoryQuery, setCategoryQuery] = useQueryParam('category', StringParam)

  const {t} = useTranslation();
  // const [query, setQuery] = useQueryParams({
  //   product: StringParam,
  //   category: StringParam,
  // });

  // const searchData = useSelector((state: AppStateType) => state.products.search)
  // useEffect(() => {
  //   // setProductQuery(searchData)
  //   setQuery({ product: searchData })
  //   // setProductQueryParams(searchData)
  // }, [searchData])

  //
  // const formikHandleChange = (e) => {
  //   setNewField({ ...prevState, [e.target.name]: e.target.value })
  // }

  const handleFieldChange = (e: any, fieldName: string) => {
    formik.handleChange(e)
    setQuery({ [fieldName]: e.target.value })
  }
  // console.log('query', query )

  return (
    <div className={style.searchStyle}>
      <div>
        <form onSubmit={formik.handleSubmit}>

          <TextField type='text' label='Search product' name='product' onChange={(e) => handleFieldChange(e, 'product')}
                     onBlur={handleBlur}
                     value={values.product}/>

          {touched.search && errors.search && <p>{errors.search}</p>}

          <Button
            color="primary"
            variant="contained"
            disabled={!isValid && !dirty}
            type="submit"
          >
            {t("Search_product")}
          </Button>

          <div>
            <FormControl style={selectStyle}>
              <InputLabel id='categories'>All category </InputLabel>
              <Select
                labelId='categories'
                id={filteredCategorySelector}
                name="category"
                onChange={(e: any) => handleFieldChange(e, 'category')}
                value={formik.values.category}
              >
                <MenuItem value={"All category"}>All category</MenuItem>
                {categoriesData.map(category => <MenuItem key={category}
                                                          value={category}> {category} </MenuItem>)}
              </Select>
            </FormControl>
            {<Button style={buttonStyle} variant='contained' type="button" onClick={changeUrl}>Go to main
              page</Button>}
          </div>
        </form>
      </div>



    </div>
  )
}


export default SearchForm;


//   {
// <select onChange={(e) => handleCategory(e)} value={filteredCategorySelector}>
//       <option value="All category"> All category</option>
//    {categoriesData.map(category => <option key={category} value={category}> {category} </option>)}
// </ select>
//   }