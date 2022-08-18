import React from 'react'
import Fetch from './Fetch'
import UserRepositories from './UseRepositories'

export default function AdvancedGitHubUser({ login }) {
  return <Fetch uri={`https://api.github.com/users/${login}`} renderSuccess={UserDetails} />
}

function UserDetails({ data }) {
  return (
    <div>
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
      <UserRepositories login={data.login} selectedRepo="ch8_1" />
    </div>
  )
}
