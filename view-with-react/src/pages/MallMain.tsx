import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const Image = styled('img')({
  width: '100%'
})

export default function MallMain() {
  const [products, setProducts] = useState<typeOfProductsResponse[]>()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:8080/products`)
        .then((res) => res.json())
        .then(setProducts)
        .then(() => setLoading(false))
        .catch(setError)
    }, 3000)

    return () => setProducts([])
  }, [])

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return (
    <Grid container spacing={1}>
      <Grid container item spacing={4}>
        <Grid item xs>
          <Product loading={loading} product={products?.at(0)} />
        </Grid>
        <Grid item xs>
          <Product loading={loading} product={products?.at(1)} />
        </Grid>
        <Grid item xs>
          <Product loading={loading} product={products?.at(2)} />
        </Grid>
      </Grid>

      <Grid container item spacing={4}>
        <Grid item xs zeroMinWidth>
          <Product loading={loading} product={products?.at(3)} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Product loading={loading} product={products?.at(4)} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Product loading={loading} product={products?.at(5)} />
        </Grid>
      </Grid>
    </Grid>
  )
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

function Product(props: { loading?: boolean; product?: typeOfProductsResponse }) {
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
            props.product && <Typography>{props.product.productName}</Typography>
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
