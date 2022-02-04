// @ts-ignore
import productsAPI from '../../API/api.ts'
// @ts-ignore
import {BaseThunkType, InferActionsTypes, } from './redux-store.ts'
// @ts-ignore
import {ActionTypes} from "./actionTypes.ts";

export type ProductsDataType = {
  img: string
  asin: string,
  price: number
  bsr_category: string
  link: string
  name: string
}

export interface InitialStateInterface {
    productsData: ProductsDataType[];
    categories: string[];
    search: string;
}

let initialState: InitialStateInterface = {
  productsData: [] ,
  categories: [] ,
  search: '',
}


const productsReducer = (state = initialState, action: ActionsType): InitialStateInterface => {

  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      const allCategories = action.payload.map((product: ProductsDataType) => product.bsr_category)
      // @ts-ignore t
      const categories: Array<string> = [...new Set(allCategories)]
      return {...state, productsData: action.payload, categories}
    case 'SET_SEARCH':
      return {...state, search: action.payload}
    default:
      return state;
  }
}
type ActionsType = InferActionsTypes<typeof actions>
// type ThunkType = BaseThunkType<ActionsType>

export const actions = {
  // setProducts: (products: ProductsDataType[]) => ({type: 'SET_PRODUCTS', products} as const),
  setSearch: (search: string) => ({type: 'SET_SEARCH', payload: search} as const)
}

// export const getArrayData = (): ThunkType => async (dispatch: ActionsType) => {
//   const data = await productsAPI.getProducts()
//   dispatch(actions.setProducts(data))
// }

export default productsReducer