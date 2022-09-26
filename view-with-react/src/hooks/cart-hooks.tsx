import React, { useState, useContext, useEffect, useReducer } from 'react'
import { faker } from '@faker-js/faker'
import { ProductForType } from './product-hooks'
import { getRandomIntInclusive } from '../utils'

export interface ICartContext {
  products: ProductForType[]
  addFakeProduct: (cnt: number) => void
  addProduct: (newProduct: ProductForType) => void
  addProductWithCalculateTotalPrice: (newProduct: ProductForType) => void
  removeProduct: (product: ProductForType) => void
  updateProductInCart: (product: ProductForType) => void
  printProducts: () => void
  removeAll: () => void
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
    case 'add': {
      const result = state.findIndex((product) => product.productId === action.product.productId)
      return result === -1
        ? [...state, action.product]
        : [...state, { ...action.product, productId: faker.datatype.uuid() }]
    }
    case 'remove':
      return state.filter((product) => product.productId !== action.product.productId)
    case 'removeAll':
      return []
    case 'update':
      return state.map((product) =>
        product.productId === action.product?.productId ? action.product : product
      )

    default:
      throw new Error()
  }
}

export function CartProvider(props: any) {
  const [products, dispatch] = useReducer(reducer, initialState)

  const addFakeProduct = (cnt: number) =>
    Array(cnt).map((noUse) => {
      const quantity = getRandomIntInclusive(1, 10)
      const productPrice = Number(faker.commerce.price(1000, 2000, 0))
      dispatch({
        type: 'add',
        product: {
          productId: faker.datatype.uuid(),
          productDescription: faker.commerce.productDescription(),
          productImg: faker.image.business(450, 200, true),
          productName: faker.commerce.productName(),
          productCategory: faker.commerce.productAdjective(),
          productPrice: faker.commerce.price(1000, 2000, 0),
          sellerAvatar: faker.image.people(200, 200, true),
          sellerName: faker.internet.userName(),
          sellerEmail: faker.internet.email(),
          company: faker.company.name(),
          companyDomain: faker.internet.url(),
          registeredAt: faker.date.past().toLocaleDateString(),
          quantity: quantity,
          optionCode: getRandomIntInclusive(1, 10).toString(),
          totalPrice: quantity * productPrice
        }
      })
    })
  const addProduct = (newProduct: ProductForType) =>
    dispatch({
      type: 'add',
      product: newProduct
    })
  const addProductWithCalculateTotalPrice = (newProduct: ProductForType) => {
    const productPrice = isNaN(Number(newProduct.productPrice)) ? 1 : Number(newProduct.productPrice)
    newProduct.totalPrice = newProduct.quantity * productPrice
    dispatch({
      type: 'add',
      product: newProduct
    })
  }
  const removeProduct = (product: ProductForType) =>
    dispatch({
      type: 'remove',
      product: product
    })
  const updateProductInCart = (product: ProductForType) =>
    dispatch({
      type: 'update',
      product: product
    })
  const printProducts = () => {
    console.log(`products.length: ${products.length}`)
    products.map((product) => console.log(JSON.stringify(product, null, 2)))
  }
  const removeAll = () =>
    dispatch({
      type: 'removeAll',
      product: {} as ProductForType
    })

  return (
    <CartContext.Provider
      value={{
        products,
        addFakeProduct,
        addProduct,
        addProductWithCalculateTotalPrice,
        removeProduct,
        updateProductInCart,
        printProducts,
        removeAll
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}
