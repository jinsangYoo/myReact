import React from 'react'

import { PersonalMain, PersonalCommunity, PersonalAbout } from '../../pages'

interface FactoryContentPanelForPersonalProps {
  path: string
}

export default function FactoryContentPanelForPersonal({ path }: FactoryContentPanelForPersonalProps) {
  switch (path) {
    case 'main':
      return <PersonalMain />
    case 'community':
      return <PersonalCommunity />
    case 'about':
      return <PersonalAbout />
    default:
      return <p>not find content.</p>
  }
}
