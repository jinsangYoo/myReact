import React, { useState, useContext, useEffect, useReducer } from 'react'
import { faker } from '@faker-js/faker'
import { ProductForType } from './product-hooks'
import { getRandomIntInclusive } from '../utils'

export type OrderStateType =
  | 'MakeOrder'
  | 'RequestForDelivery'
  | 'DoneForDelivery'
  | 'Cancel'
  | 'RequestForCancel'
  | 'CancelBySeller'
  | 'Done'
  | 'None'

export type OrderType = {
  ordererName: string
  orderState: OrderStateType
  orderNumber: string
  payMethodName: string
  products: ProductForType[]
  makeDate?: Date
}

const OrderContext = React.createContext({} as IOrderContext)
export const useOrder = () => useContext(OrderContext)

interface IOrderAction {
  type: string
  products: ProductForType[]
}

interface IOrdersAction {
  type: string
  order: OrderType
}

const initialOrderListState: OrderType[] = []
const initialTemporaryOrderState: OrderType = resetOrder()

export interface IOrderContext {
  order: OrderType
  setFakeOrderInTempOrder: (cnt: number) => void
  setProductInTempOrder: (newProduct: ProductForType) => void
  setProductsInTempOrder: (newProducts: ProductForType[]) => void
  setProductInTempNewOrderWithCalculateTotalPrice: (newProduct: ProductForType) => void
  removeOrderInTempOrder: (product: ProductForType) => void
  printOrder: () => void
  updateOrderState: (order: OrderType, newState: OrderStateType) => void

  orders: OrderType[]
  addOrder: (newOrder: OrderType) => void
  removeOrder: (order: OrderType) => void
  removeAllInOrders: () => void
}

function reducer(state: OrderType, action: IOrderAction) {
  switch (action.type) {
    case 'setNewOrder':
      state.orderState = 'MakeOrder'
      state.orderNumber = faker.datatype.uuid()
      state.payMethodName = randomGetPayMethod()
      return { ...state, products: [...action.products] }
    case 'setInOrder':
      return { ...state, products: [...state.products, ...action.products] }
    case 'removeInOrder':
      return resetOrder()

    default:
      throw new Error()
  }
}

export function OrderProvider(props: any) {
  const [order, dispatch] = useReducer(reducer, initialTemporaryOrderState)

  const setFakeOrderInTempOrder = (cnt: number) =>
    Array(cnt).map((noUse) => {
      const quantity = getRandomIntInclusive(1, 10)
      const productPrice = Number(faker.commerce.price(1000, 2000, 0))
      dispatch({
        type: 'setInOrder',
        products: [
          {
            productId: faker.datatype.uuid(),
            productDescription: faker.commerce.productDescription(),
            productImg: faker.image.business(450, 200, true),
            productName: faker.commerce.productName(),
            productCategory: faker.commerce.productAdjective(),
            productPrice: productPrice.toString(),
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
        ]
      })
    })
  const setProductInTempOrder = (newProduct: ProductForType) =>
    dispatch({
      type: 'setInOrder',
      products: [newProduct]
    })
  const setProductsInTempOrder = (newProducts: ProductForType[]) =>
    dispatch({
      type: 'setInOrder',
      products: newProducts
    })
  const setProductInTempNewOrderWithCalculateTotalPrice = (newProduct: ProductForType) => {
    const productPrice = isNaN(Number(newProduct.productPrice)) ? 1 : Number(newProduct.productPrice)
    newProduct.totalPrice = newProduct.quantity * productPrice
    dispatch({
      type: 'setNewOrder',
      products: [newProduct]
    })
  }
  const removeOrderInTempOrder = (product: ProductForType) =>
    dispatch({
      type: 'removeInOrder',
      products: [product]
    })
  const printOrder = () => {
    console.log(`orderState: ${order.orderState}`)
    console.log(`orderNumber: ${order.orderNumber}`)
    console.log(`payMethodName: ${order.payMethodName}`)
    order.products?.map((product) => console.log(JSON.stringify(product, null, 2)))
  }
  const updateOrderState = (order: OrderType, newState: OrderStateType) => {
    order.orderState = newState
    dispatchForOrders({
      type: 'updateOrder',
      order: order
    })
  }

  const [orders, dispatchForOrders] = useReducer(reducerForOrders, initialOrderListState)
  const addOrder = (newOrder: OrderType) =>
    dispatchForOrders({
      type: 'addOrder',
      order: newOrder
    })
  const removeOrder = (order: OrderType) =>
    dispatchForOrders({
      type: 'removeOrder',
      order: order
    })
  const removeAllInOrders = () =>
    dispatchForOrders({
      type: 'removeAllOrders',
      order: {} as OrderType
    })

  return (
    <OrderContext.Provider
      value={{
        order,
        setFakeOrderInTempOrder,
        setProductInTempOrder,
        setProductsInTempOrder,
        setProductInTempNewOrderWithCalculateTotalPrice,
        removeOrderInTempOrder,
        printOrder,
        orders,
        addOrder,
        removeOrder,
        removeAllInOrders,
        updateOrderState
      }}
    >
      {props.children}
    </OrderContext.Provider>
  )
}

function reducerForOrders(state: OrderType[], action: IOrdersAction) {
  switch (action.type) {
    case 'addOrder': {
      const result = state.findIndex((order) => order.orderNumber === action.order.orderNumber)
      return result === -1
        ? [...state, action.order]
        : [...state, { ...action.order, orderNumber: faker.datatype.uuid() }]
    }
    case 'removeOrder':
      return state.filter((order) => order.orderNumber !== action.order.orderNumber)
    case 'removeAllOrders':
      return [] as OrderType[]
    case 'updateOrder':
      return state.map((order) => (order.orderNumber === action.order.orderNumber ? action.order : order))

    default:
      throw new Error()
  }
}

function resetOrder(): OrderType {
  return {
    ordererName: '',
    orderState: 'None',
    orderNumber: '',
    payMethodName: '',
    products: []
  }
}

function randomGetOrderState(value: number): OrderStateType {
  if (value < 10) return 'RequestForDelivery'
  else if (value < 20) return 'RequestForDelivery'
  else if (value < 30) return 'DoneForDelivery'
  else if (value < 40) return 'Cancel'
  else if (value < 50) return 'RequestForCancel'
  else if (value < 60) return 'CancelBySeller'
  else return 'Done'
}

export function randomGetPayMethod(): string {
  const value = getRandomIntInclusive(1, 60)
  if (value < 10) return 'cash'
  else if (value < 20) return 'kakao pay'
  else if (value < 30) return 'naver pay'
  else if (value < 40) return 'credit card'
  else if (value < 50) return 'smile pay'
  else return 'payco'
}
