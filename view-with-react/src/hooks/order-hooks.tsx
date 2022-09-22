import React, { useState, useContext, useEffect, useReducer } from 'react'
import { faker } from '@faker-js/faker'
import { ProductForType } from './product-hooks'
import { getRandomIntInclusive } from '../utils'

export type OrderStateType =
  | 'RequestForDelivery'
  | 'DoneForDelivery'
  | 'Cancel'
  | 'RequestForCancel'
  | 'CancelBySeller'
  | 'Done'
  | 'None'

export type ProductForOrderType = {
  quantity: number
  optionCode?: string
  totalPrice: number
} & ProductForType

export type OrderType = {
  orderState: OrderStateType
  orderNumber: string
  payMethodName: string
  products?: ProductForOrderType[]
}

const OrderContext = React.createContext({} as IOrderContext)
export const useOrder = () => useContext(OrderContext)

interface IOrderAction {
  type: string
  product: ProductForOrderType
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
  setProductInTempOrder: (newProduct: ProductForOrderType) => void
  setProductInTempOrderWithCalculateToTalPrice: (newProduct: ProductForOrderType) => void
  removeOrderInTempOrder: (product: ProductForOrderType) => void
  printOrder: () => void
  orders: OrderType[]
  addOrder: (newOrder: OrderType) => void
  removeOrder: (order: OrderType) => void
  updateOrderState: (order: OrderType, newState: OrderStateType) => void
}

function reducer(state: OrderType, action: IOrderAction) {
  switch (action.type) {
    case 'setInOrder':
      return { ...state, ...action }
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
        product: {
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
      })
    })
  const setProductInTempOrder = (newProduct: ProductForOrderType) =>
    dispatch({
      type: 'setInOrder',
      product: newProduct
    })
  const setProductInTempOrderWithCalculateToTalPrice = (newProduct: ProductForOrderType) => {
    const productPrice = isNaN(Number(newProduct.productPrice)) ? 1 : Number(newProduct.productPrice)
    newProduct.totalPrice = newProduct.quantity * productPrice
    dispatch({
      type: 'setInOrder',
      product: newProduct
    })
  }
  const removeOrderInTempOrder = (product: ProductForOrderType) =>
    dispatch({
      type: 'removeInOrder',
      product: product
    })
  const printOrder = () => {
    console.log(`orderState: ${order.orderState}`)
    console.log(`orderNumber: ${order.orderNumber}`)
    console.log(`payMethodName: ${order.payMethodName}`)
    order.products?.map((product) => console.log(JSON.stringify(product, null, 2)))
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
  const updateOrderState = (order: OrderType, newState: OrderStateType) => {
    order.orderState = newState
    dispatchForOrders({
      type: 'updateOrder',
      order: order
    })
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        setFakeOrderInTempOrder,
        setProductInTempOrder,
        setProductInTempOrderWithCalculateToTalPrice,
        removeOrderInTempOrder,
        printOrder,
        orders,
        addOrder,
        removeOrder,
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
    case 'updateOrder':
      return state.map((order) => (order.orderNumber === action.order.orderNumber ? action.order : order))

    default:
      throw new Error()
  }
}

function resetOrder(): OrderType {
  return {
    orderState: 'None',
    orderNumber: '',
    payMethodName: '',
    products: []
  }
}

function randomGetOrderState(value: number): OrderStateType {
  if (value < 10) return 'RequestForDelivery'
  else if (value < 20) return 'DoneForDelivery'
  else if (value < 30) return 'Cancel'
  else if (value < 40) return 'RequestForCancel'
  else if (value < 50) return 'CancelBySeller'
  else return 'Done'
}
