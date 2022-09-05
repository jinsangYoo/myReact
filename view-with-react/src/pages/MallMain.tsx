import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'

const Image = styled('img')({
  width: '100%'
})

export default function MallMain() {
  const [products, setProducts] = useReducer(
    (products: typeOfProductsResponse[], newProducts: typeOfProductsResponse[]) => [
      ...products,
      ...newProducts
    ],
    []
  )
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      getProducts(setProducts, setError, setLoading)
    }, 3000)

    return () => setProducts([])
  }, [])

  const root = document.getElementById('root')
  const [y, setY] = useState(window.scrollY)
  const handleScroll = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window
      const clientHeight = root?.clientHeight || 1
      const rate = ((window.scrollY + window.innerHeight) / clientHeight) * 100
      if (rate > 95) {
        getProducts(setProducts, setError)
      }
      setY(window.scrollY)
    },
    [y]
  )

  useEffect(() => {
    setY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return (
    <Box
      sx={{
        display: 'grid',
        columnGap: 3,
        rowGap: 1,
        gridTemplateColumns: 'repeat(2, 1fr)',
        px: 3
      }}
    >
      {loading
        ? Array.from({ length: 10 }).map((noUse, index) => (
            <Product key={index} index={index} loading={loading} />
          ))
        : products?.map((product, index) => (
            <Product key={index} index={index} loading={loading} product={product} />
          ))}
    </Box>
  )
}

function getProducts(
  setProducts: React.Dispatch<typeOfProductsResponse[]>,
  setError: React.Dispatch<React.SetStateAction<undefined>>,
  setLoading?: (value: React.SetStateAction<boolean>) => void
) {
  fetch(`http://localhost:8080/products`)
    .then((res) => res.json())
    .then((res) => setProducts(res))
    .then(() => setLoading && setLoading(false))
    .catch(setError)
}

type typeOfProductsResponse = {
  productId: string
  productDescription: string
  productImg: string
  productName: string
  productPrice: string
  sellerAvatar: string
  sellerName: string
  sellerEmail: string
  company: string
  companyDomain: string
  registeredAt: string
}

function Product(props: { index: number; loading?: boolean; product?: typeOfProductsResponse }) {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
          {props.loading ? (
            <Skeleton variant="circular" animation="wave">
              <Avatar />
            </Skeleton>
          ) : (
            props.product && <Avatar src={props.product.sellerAvatar} />
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          {props.loading ? (
            <Skeleton width="100%" animation="wave">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            props.product && (
              <Typography>
                {props.index + 1}. {props.product.productName}
              </Typography>
            )
          )}
        </Box>
      </Box>
      {props.loading ? (
        <Skeleton variant="rectangular" width="100%" animation="wave">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
      ) : (
        props.product && <Image src={props.product.productImg} alt="" />
      )}
      <Box sx={{ width: '100%' }}>
        {props.loading ? (
          <Box sx={{ pt: 0.5 }}>
            <Skeleton animation="wave" />
            <Skeleton width="60%" animation="wave" />
          </Box>
        ) : (
          props.product && (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {props.product.productDescription}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary">
                가격: {props.product.productPrice} 원
              </Typography>
            </Box>
          )
        )}
      </Box>
    </div>
  )
}
