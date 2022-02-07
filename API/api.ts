// @ts-ignore
import axios from 'axios'
import {ProductsDataType} from '../Components/redux/products-Reducer'

type GetDataProductResponceType = {
    products:   ProductsDataType []
}

const PRODUCTS = "/products"
const instance = axios.create({
    baseURL: 'https://61f10fa1072f86001749efdc.mockapi.io/api/products'
})

const productsAPI = {
    getProducts() {
        return instance.get<GetDataProductResponceType>(PRODUCTS).then(res => res.data.products)
        // return result
    }
}
export default productsAPI; 

