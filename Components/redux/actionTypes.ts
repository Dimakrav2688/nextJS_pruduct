export enum ActionTypes {
  FETCH_PRODUCT_DATA = 'FETCH_PRODUCT_DATA',
  SET_PRODUCTS = 'SET_PRODUCTS'
}

export const getDataAction = () => ({
  type: ActionTypes.FETCH_PRODUCT_DATA,
})

export const setDataAction = (products: any) => ({
  type: ActionTypes.SET_PRODUCTS,
  payload: products
})

// export const setSearch = (search: any) => ({
//   type:ActionTypes.SET_SEARCH,
//   payload: search
// })