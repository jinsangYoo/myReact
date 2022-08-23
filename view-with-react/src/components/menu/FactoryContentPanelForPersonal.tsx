import React from 'react'

import { PersonalMain, PersonalCommunity, PersonalAbout } from '../../pages'

interface FactoryContentPanelForPersonalProps {
  id: string
}

export default function FactoryContentPanelForPersonal({ id }: FactoryContentPanelForPersonalProps) {
  switch (id) {
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
