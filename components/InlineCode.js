import React from 'react'

const InlineCode = ({ as, href, ...otherProps }) => (
  <>
    <code {...otherProps} />
    <style jsx>{`
      code {
        color: tomato;
        background: #42b3f42c;
        font-size: 14px;
        padding: 2px;
        border-radius: 6px;
      }
    `}</style>
  </>
)

export default InlineCode
