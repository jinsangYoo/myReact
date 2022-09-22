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
  updateProduct: (newProduct: ProductForType) => void
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
      productImg: faker.image.business(200, 80, true),
      productName: faker.commerce.productName(),
      productCategory: faker.commerce.productAdjective(),
      productPrice: faker.commerce.price(100, 200, 0),
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
  }
  const updateProduct = (newProduct: ProductForType) =>
    setProduct(product ? { ...product, ...newProduct } : { ...newProduct })

  return (
    <ProductContext.Provider
      value={{
        product,
        newFakeProduct,
        updateProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}
