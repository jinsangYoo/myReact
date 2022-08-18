import React, { useEffect } from 'react'
import { useIterator } from '../hooks'
import RepositoryReadme from './RespositoryReadme'

export default function RepoMenu({ repositories, selected, login }) {
  const [{ name }, previous, next] = useIterator(
    repositories,
    selected ? repositories.findIndex((repo) => repo.name === selected) : null
  )

  useEffect(() => {
    if (!name) return
  }, [name])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <button onClick={previous}>&lt;</button>
        <p>{name}</p>
        <button onClick={next}>&gt;</button>
      </div>
      <RepositoryReadme login={login} repo={name} />
    </>
  )
}
