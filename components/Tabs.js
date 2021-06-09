import React from 'react'
import styles from './tabs.module.css'

export class Tabs extends React.Component{
  state ={
    activeTab: this.props.children[0].props.title
  }
  changeTab = (tab) => {

    this.setState({ activeTab: tab });
  };
  render(){
    
    let content;
    let buttons = [];
    return (
      <div>
        {React.Children.map(this.props.children, child =>{
          buttons.push(child.props.title)
          if (child.props.title === this.state.activeTab) content = child.props.children
        })}
         
        <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
        <div className={styles["tab-content"]}>{content}</div>
        
      </div>
    );
  }
}

const TabButtons = ({buttons, changeTab, activeTab}) =>{
   
  return(
    <div className={styles["tab-buttons"]}>
    {buttons.map(button =>{
       return <button className={button === activeTab? styles['active']: ''} onClick={()=>changeTab(button)}>{button}</button>
    })}
    </div>
  )
}

export const Tab = props =>{
  return(
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}