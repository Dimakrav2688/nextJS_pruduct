import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import TextField from '@mui/material/TextField';
// @ts-ignore
import style from './style.module.css'
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// @ts-ignore
import { useTranslation } from "react-i18next";
import {useRouter} from "next/router";



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

                                                     changeUrl,
                                                     filteredCategorySelector,
                                                     categoriesData,
                                                   }: SearchFormPropsType) => {

  const [skipFirstRender, setSkipFirstRender] = useState(false)
  console.log(formik)


  const { values, errors, touched, handleBlur, isValid, handleSubmit, dirty } = formik


  useEffect(() => {
    if (skipFirstRender) {
      formik.handleSubmit()
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

  const { t } = useTranslation();

  const router = useRouter();

  const handleFieldChange = (e: any, fieldName: string) => {
    formik.handleChange(e)
    router.push({
      pathname: '/',
      query:{[fieldName]: e.target.value}
    })
  }


  return (
    <div className={style.searchStyle}>
      <div>
        <form onSubmit={formik.handleSubmit}>

          <TextField type='text' label='Search product' name='product' onChange={(e) => handleFieldChange(e, 'product')}
                     onBlur={handleBlur}
                     value={values.product} />

          {touched.product && errors.product && <p>{errors.product}</p>}

          <Button
            color="primary"
            variant="contained"
            disabled={!isValid && !dirty}
            type="submit"
          >
            {t("Search_product")}
          </Button>

          <div className={style.category}>
            <FormControl style={selectStyle}>
              <InputLabel id='categories'>All category </InputLabel>
              <Select
                labelId='categories'
                id={filteredCategorySelector}
                name="category"
                onChange={(e: any) => handleFieldChange(e, 'category')}
                value={values.category}
              >
                <MenuItem value={"All category"}>All category</MenuItem>
                {categoriesData.map(category => <MenuItem key={category} value={category}> {category} </MenuItem>)}
              </Select>
            </FormControl>
            {<Button style={buttonStyle} variant='contained' type="button" onClick={changeUrl}>
              Go to main page
            </Button>}
          </div>
        </form>
      </div>
    </div>
  )
}


export default SearchForm;


