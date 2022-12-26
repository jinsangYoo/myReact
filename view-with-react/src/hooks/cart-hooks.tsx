import React, { useState, useContext, useEffect, useReducer } from 'react'
import { faker } from '@faker-js/faker'
import { ProductForType } from './product-hooks'
import { getRandomIntInclusive } from '../utils'

export interface ICartContext {
  productsInCart: ProductForType[]
  makeFakeProducts: (cnt: number) => ProductForType[]
  addProducts: (products: ProductForType[]) => void
  addProduct: (newProduct: ProductForType) => void
  addProductWithCalculateTotalPrice: (newProduct: ProductForType) => void
  removeProduct: (product: ProductForType) => void
  updateProductInCart: (product: ProductForType) => void
  printProducts: () => void
  removeAllInCart: () => void
}

const CartContext = React.createContext({} as ICartContext)
export const useCart = () => useContext(CartContext)

interface ICartAction {
  type: string
  products?: ProductForType[]
}

const initialState: ProductForType[] = []

function reducer(state: ProductForType[], action: ICartAction) {
  switch (action.type) {
    case 'add':
      return action.products ? [...state, ...action.products] : state
    case 'remove': {
      const [firstProduct] = action.products ? action.products : ([] as ProductForType[])
      return firstProduct && state.filter((product) => product.productId !== firstProduct.productId)
    }
    case 'removeAll':
      return [] as ProductForType[]
    case 'update': {
      const [firstProduct] = action.products ? action.products : ([] as ProductForType[])
      return (
        firstProduct &&
        state.map((product) => (product.productId === firstProduct.productId ? firstProduct : product))
      )
    }
    default:
      throw new Error()
  }
}

export function CartProvider(props: any) {
  const [products, dispatch] = useReducer(reducer, initialState)

  const makeFakeProducts = (cnt: number) => {
    const _products: ProductForType[] = []
    Array(cnt)
      .fill(undefined)
      .map((noUse) => {
        const quantity = getRandomIntInclusive(1, 20)
        const productPrice = Number(faker.commerce.price(1000, 2000, 0))
        _products.push({
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
          optionCode: getRandomIntInclusive(1, 30).toString(),
          totalPrice: quantity * productPrice
        })
      })
    return _products
  }
  const addProducts = (products: ProductForType[]) => {
    dispatch({
      type: 'add',
      products: products
    })
  }
  const addProduct = (newProduct: ProductForType) => {
    const result = products.findIndex((product) => product.productId === newProduct.productId)
    const newUniqueProduct =
      result === -1 ? [newProduct] : [{ ...newProduct, productId: faker.datatype.uuid() }]

    dispatch({
      type: 'add',
      products: newUniqueProduct
    })
  }
  const addProductWithCalculateTotalPrice = (newProduct: ProductForType) => {
    const productPrice = isNaN(Number(newProduct.productPrice)) ? 0 : Number(newProduct.productPrice)
    newProduct.totalPrice = newProduct.quantity * productPrice
    dispatch({
      type: 'add',
      products: [newProduct]
    })
  }
  const removeProduct = (product: ProductForType) =>
    dispatch({
      type: 'remove',
      products: [product]
    })
  const updateProductInCart = (product: ProductForType) =>
    dispatch({
      type: 'update',
      products: [product]
    })
  const printProducts = () => {
    console.log(`products.length: ${products.length}`)
    products.map((product) => console.log(JSON.stringify(product, null, 2)))
  }
  const removeAllInCart = () =>
    dispatch({
      type: 'removeAll'
    })

  return (
    <CartContext.Provider
      value={{
        productsInCart: products,
        makeFakeProducts,
        addProducts,
        addProduct,
        addProductWithCalculateTotalPrice,
        removeProduct,
        updateProductInCart,
        printProducts,
        removeAllInCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}
