import React, { useState } from 'react'
import { createPortal } from 'react-dom'

interface CustomIframePortalProps {
  children: React.ReactNode
}

const CustomIframePortal = (props: CustomIframePortalProps) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null)

  const mountNode = contentRef?.contentWindow?.document?.body

  return (
    <iframe title="A custom made iframe portal" {...props} ref={setContentRef} width="500" height="200">
      {mountNode && createPortal(props.children, mountNode)}
    </iframe>
  )
}

export default CustomIframePortal
