import React, { useState, useContext, useEffect } from 'react'
import { faker } from '@faker-js/faker'
import { getRandomIntInclusive } from '../utils'

export type ProductForType = {
  productId: string
  productDescription: string
  productImg: string
  productName: string
  productCategory: string
  productPrice: string
  sellerAvatar: string
  sellerName: string
  sellerEmail: string
  company: string
  companyDomain: string
  registeredAt: string
  quantity: number
  optionCode?: string
  totalPrice?: number
}

export interface IProductContext {
  product: ProductForType
  newFakeProduct: () => ProductForType
  newFakeProducts: (cnt: number) => ProductForType[]
  updateProduct: (newProduct: ProductForType) => void
  resetProduct: () => void
}

const ProductContext = React.createContext({} as IProductContext)
export const useProduct = () => useContext(ProductContext)

export function ProductProvider(props: any) {
  const [product, setProduct] = useState({
    productId: '',
    productDescription: '',
    productImg: '',
    productName: '',
    productCategory: '',
    productPrice: '',
    sellerAvatar: '',
    sellerName: '',
    sellerEmail: '',
    company: '',
    companyDomain: '',
    registeredAt: '',
    quantity: 0
  })

  const newFakeProduct = () => {
    const quantity = getRandomIntInclusive(1, 10)
    const productPrice = Number(faker.commerce.price(1000, 2000, 0))
    return {
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
    }
  }
  const newFakeProducts = (cnt: number) => {
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
  const updateProduct = (newProduct: ProductForType) => {
    const _productPrice = isNaN(Number(newProduct.productPrice)) ? 1 : Number(newProduct.productPrice)
    newProduct.totalPrice = newProduct.quantity * _productPrice
    setProduct(product ? { ...product, ...newProduct } : { ...newProduct })
  }
  const resetProduct = () =>
    setProduct({
      productId: '',
      productDescription: '',
      productImg: '',
      productName: '',
      productCategory: '',
      productPrice: '',
      sellerAvatar: '',
      sellerName: '',
      sellerEmail: '',
      company: '',
      companyDomain: '',
      registeredAt: '',
      quantity: 0
    })

  return (
    <ProductContext.Provider
      value={{
        product,
        newFakeProduct,
        newFakeProducts,
        updateProduct,
        resetProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}
