import React, { useState, useContext, useEffect, useReducer } from 'react'
import { faker } from '@faker-js/faker'
import { ProductForType } from './product-hooks'

export interface ICartContext {
  products: ProductForType[]
  addFakeProduct: (cnt: number) => void
  addProduct: (newProduct: ProductForType) => void
  removeProduct: (newProduct: ProductForType) => void
  updateProductInCart: (newProduct: ProductForType) => void
  printProducts: () => void
}

const CartContext = React.createContext({} as ICartContext)
export const useCart = () => useContext(CartContext)

interface ICartAction {
  type: string
  product: ProductForType
}

const initialState: ProductForType[] = []

function reducer(state: ProductForType[], action: ICartAction) {
  switch (action.type) {
    case 'add':
      return [...state, action.product]
    case 'remove':
      return state.filter((product) => product.productId === action.product.productId)
    case 'update':
      return state.map((product) =>
        product.productId === action.product.productId ? action.product : product
      )

    default:
      throw new Error()
  }
}

export function CartProvider(props: any) {
  const [products, dispatch] = useReducer(reducer, initialState)

  const addFakeProduct = (cnt: number) =>
    Array(cnt).map((noUse) => {
      dispatch({
        type: 'add',
        product: {
          productId: faker.datatype.uuid(),
          productDescription: faker.commerce.productDescription(),
          productImg: faker.image.business(450, 200, true),
          productName: faker.commerce.productName(),
          productPrice: faker.commerce.price(1000, 2000, 0),
          sellerAvatar: faker.image.people(200, 200, true),
          sellerName: faker.internet.userName(),
          sellerEmail: faker.internet.email(),
          company: faker.company.name(),
          companyDomain: faker.internet.url(),
          registeredAt: faker.date.past().toLocaleDateString()
        }
      })
    })
  const addProduct = (newProduct: ProductForType) =>
    dispatch({
      type: 'add',
      product: newProduct
    })
  const removeProduct = (newProduct: ProductForType) =>
    dispatch({
      type: 'remove',
      product: newProduct
    })
  const updateProductInCart = (newProduct: ProductForType) =>
    dispatch({
      type: 'update',
      product: newProduct
    })
  const printProducts = () => {
    console.log(`products.length: ${products.length}`)
    products.map((product) => console.log(JSON.stringify(product, null, 2)))
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addFakeProduct,
        addProduct,
        removeProduct,
        updateProductInCart,
        printProducts
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}
