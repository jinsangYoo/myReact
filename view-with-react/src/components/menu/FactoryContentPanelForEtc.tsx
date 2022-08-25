import React from 'react'

import { EtcMain, EtcGrid } from '../../pages'

interface FactoryContentPanelForEtcProps {
  path: string
}

export default function FactoryContentPanelForEtc({ path }: FactoryContentPanelForEtcProps) {
  switch (path) {
    case 'main':
      return <EtcMain />
    case 'grid':
      return <EtcGrid />
    default:
      return <p>not find content.</p>
  }
}
