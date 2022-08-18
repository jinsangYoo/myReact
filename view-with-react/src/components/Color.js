import React from 'react'
import StarRating from './StarRating'
import { FaTrash } from 'react-icons/fa'
import { useColors } from '../hooks'
import { useNavigate } from 'react-router-dom'

export default function Color({ id, title, color, rating }) {
  let navigate = useNavigate()
  const { rateColor, removeColor } = useColors()
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => removeColor(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, background: color }}>
        <button
          onClick={() => {
            navigate(`/${id}`)
          }}
        >
          go to ColorDetails
        </button>
      </div>
      <StarRating selectedStars={rating} onRate={(newRating) => rateColor(id, newRating)} />
    </section>
  )
}
