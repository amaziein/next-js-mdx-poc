import React from 'react'
import cn from 'classnames'
import styles from './tabs.module.css'

export class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.title,
  }
  changeTab = (tab) => {
    this.setState({ activeTab: tab })
  }
  render() {
    let content
    let buttons = []
    return (
      <div className={styles.mainWrapper}>
        {React.Children.map(this.props.children, (child) => {
          buttons.push(child.props.title)
          if (child.props.title === this.state.activeTab) content = child.props.children
        })}

        <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab} />
        <div className={styles.tabContent}>{content}</div>
      </div>
    )
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className={styles.tabButtonsWrapper}>
      {buttons.map((button) => {
        return (
          <div className={cn(styles.btn, { [styles.active]: button === activeTab })} onClick={() => changeTab(button)}>
            {button}
          </div>
        )
      })}
    </div>
  )
}

export const Tab = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>
}
