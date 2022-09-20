import React, { useState, useReducer, useEffect, useCallback, useMemo, useRef } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { ProductForType, useProduct, useCart, CustomizedHook } from '../hooks'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { getRandomIntInclusive } from '../utils'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

export interface SampleType {
  title: string
  year: number
}

export default function ProductDetailInMall() {
  const quantiity = getRandomIntInclusive(1, 10)
  const optionIndex = getRandomIntInclusive(1, 30)
  const [productQuantity, setProductQuantity] = useState(quantiity)
  const [productOption, setProductOption] = useState('')
  const inputRef = React.createRef<HTMLDivElement>()
  const { product } = useProduct()
  const { addProduct, printProducts } = useCart()

  const handleAddCart = (product: ProductForType) => {
    if (!product) return
    console.log(`handleAddCart::product: ${JSON.stringify(product, null, 2)}`)
    addProduct(product)
    printProducts()
  }

  const handleGoToOrder = (product: ProductForType) => {
    if (!product) return
    console.log(`handleGoToOrder::inputRef.current: ${JSON.stringify(inputRef.current, null, 2)}`)
    console.log(`handleGoToOrder::productQuantity: ${productQuantity}`)
    console.log(`handleGoToOrder::productOption: ${productOption}`)
    console.log(`handleGoToOrder::product: ${JSON.stringify(product, null, 2)}`)
  }

  const handleSelectedOptions = (code: string) => {
    console.log(`code: ${code}`)
    // setProductOption(code)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value) ?? -1
    console.log(`e.currentTarget.value: ${value}`)
    // setProductQuantity(value)
  }

  return (
    <>
      <Product
        product={product}
        defaultQuantity={quantiity}
        defaultOptionIndex={optionIndex}
        onChangeQuantity={handleQuantityChange}
        onPressAddCart={handleAddCart}
        onPressGoToOrder={handleGoToOrder}
        onSelectedOptions={handleSelectedOptions}
      />
    </>
  )
}

function Product(props: {
  product: ProductForType
  defaultQuantity: number
  defaultOptionIndex: number
  onChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPressAddCart: (p: ProductForType) => void
  onPressGoToOrder: (p: ProductForType) => void
  onSelectedOptions: (value: string) => void
}) {
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center' }}>
        <Box sx={{ m: 1 }}>
          <Avatar src={props.product.sellerAvatar} />
        </Box>

        <Box sx={{ mr: 2 }}>
          판매자: <Typography>{props.product.productName}</Typography>
        </Box>
      </Box>
      <Image src={props.product.productImg} alt="" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ pr: 2 }}>
          <Typography gutterBottom variant="body2">
            제품 설명: {props.product.productDescription}
          </Typography>
          <Typography display="block" variant="caption" color="text.secondary">
            제품 가격:{' '}
            {Number(props.product.productPrice).toLocaleString(navigator.language, {
              minimumFractionDigits: 0
            })}{' '}
            원
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'right',
            alignItems: 'end'
          }}
        >
          <Box sx={{ mr: 1 }}>
            <TextField
              required
              id="outlined-required"
              label="제품 수량"
              defaultValue={props.defaultQuantity}
              onChange={props.onChangeQuantity}
              size="small"
              inputProps={{ inputMode: 'numeric' }}
            />
            <CustomizedHook
              labelName="옵션 구성"
              onSelectedOptions={props.onSelectedOptions}
              defaultValueIndex={props.defaultOptionIndex}
            />
          </Box>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressAddCart(props.product)}>
            장바구니 추가
          </Button>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={() => props.onPressGoToOrder(props.product)}>
            구매
          </Button>
        </Box>
      </Box>
    </div>
  )
}
