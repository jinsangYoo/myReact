import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import { ProductForType, useProduct } from '../hooks'
import { Link } from 'react-router-dom'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

export default function MallMain() {
  const [products, setProducts] = useReducer(
    (products: ProductForType[], newProducts: ProductForType[]) => [...products, ...newProducts],
    []
  )
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts(setProducts, setError, setLoading)

    return () => setProducts([])
  }, [])

  const [y, setY] = useState(window.scrollY)
  const handleScroll = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window
      const root = document.getElementById('root')
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

  const { updateProduct, resetProduct } = useProduct()
  const handleProductClick = (product: ProductForType | undefined) => {
    if (!product) return
    console.log(`product: ${JSON.stringify(product, null, 2)}`)
    updateProduct(product)
  }

  useEffect(() => {
    resetProduct()
  }, [])

  if (error)
    return (
      <div>
        <p>This list is empty.</p>
        <pre>
          reason: {error.name} - {error.message}
        </pre>
      </div>
    )
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
            <Product key={index} index={index} loading={loading} onPress={handleProductClick} />
          ))
        : products.map((product, index) => (
            <Product
              key={index}
              index={index}
              loading={loading}
              product={product}
              onPress={handleProductClick}
            />
          ))}
    </Box>
  )
}

function getProducts(
  setProducts: React.Dispatch<ProductForType[]>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>,
  setLoading?: (value: React.SetStateAction<boolean>) => void
) {
  fetch(`http://jinsang.myds.me/products`)
    .then((res) => res.json())
    .then((res) => setProducts(res))
    .then(() => setLoading && setLoading(false))
    .catch((error: Error) => {
      setError(error)
    })
}

function Product(props: {
  index: number
  onPress: (p: ProductForType | undefined) => void
  loading?: boolean
  product?: ProductForType
}) {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
          {props.loading ? (
            <Skeleton variant="circular" animation="wave">
              <Avatar />
            </Skeleton>
          ) : (
            props.product && (
              <Avatar
                src={props.product.sellerAvatar}
                component={Link}
                to={'/mall/detail'}
                onClick={() => props.onPress(props.product)}
              />
            )
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
        props.product && (
          <Link to={'/mall/detail'} onClick={() => props.onPress(props.product)}>
            <Image src={props.product.productImg} alt="" />
          </Link>
        )
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
              <Link to={'/mall/detail'} onClick={() => props.onPress(props.product)}>
                <Typography gutterBottom variant="body2">
                  ?????? ??????: {props.product.productDescription}
                </Typography>
              </Link>
              <Typography display="block" variant="caption" color="text.secondary">
                ?????? ??????:{' '}
                {Number(props.product.productPrice).toLocaleString(navigator.language, {
                  minimumFractionDigits: 0
                })}{' '}
                ???
              </Typography>
            </Box>
          )
        )}
      </Box>
    </div>
  )
}
