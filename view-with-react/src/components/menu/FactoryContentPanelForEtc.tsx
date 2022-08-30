import React from 'react'

import { EtcMain, EtcGrid } from '../../pages'

interface FactoryContentPanelForEtcProps {
  id: string
}

export default function FactoryContentPanelForEtc({ id }: FactoryContentPanelForEtcProps) {
  switch (id) {
    case 'main':
      return <EtcMain />
    case 'grid':
      return <EtcGrid />
    default:
      return <p>not find Etc content.</p>
  }
}
