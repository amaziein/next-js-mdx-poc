import React from 'react'
import cn from 'classnames'
import styles from './tag.module.css'

const Tag = ({ type, ...otherProps }) => <span className={cn(styles.tag, { [styles[type]]: true })} {...otherProps} />

export default Tag
