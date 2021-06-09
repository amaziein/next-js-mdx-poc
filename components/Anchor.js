import React from 'react'
import { getAnchorUrl } from '../utils/anchorUtils'

const Anchor = ({ children, ...props }) => {
  const anchorUrl = getAnchorUrl(children)
  const anchorName = anchorUrl.replace('#', '')

  return (
    <h2 {...props}>
      <a name={anchorName} href={anchorUrl}>
        {children}
      </a>
    </h2>
  )
}

export default Anchor
