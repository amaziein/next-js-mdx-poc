import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

const Code = ({ children, ...otherProps }) => (
  <>
    <div className="code">
      <Highlight
        {...defaultProps}
        {...otherProps}
        code={children}
        language={(otherProps.className || '').replace('language-', '')}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>

    <style jsx>{`
      .code {
        margin: 16px 0;
      }
    `}</style>
  </>
)

export default Code