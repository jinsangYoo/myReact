import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  PushProvider,
  MenuProvider,
  ProductProvider,
  CartProvider,
  OrderProvider,
  MemberProvider
} from './hooks'
import { SnackbarProvider } from 'notistack'
import { registerServiceWorker } from './serviceWorker'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <SnackbarProvider>
    <PushProvider>
      <MenuProvider>
        <MemberProvider>
          <OrderProvider>
            <CartProvider>
              <ProductProvider>
                <App />
              </ProductProvider>
            </CartProvider>
          </OrderProvider>
        </MemberProvider>
      </MenuProvider>
    </PushProvider>
  </SnackbarProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
registerServiceWorker()
