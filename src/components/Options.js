import React from 'react'
import Option from './Option'

export default (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button
        onClick={props.handleDeleteOptions}
        className="button button--link"
      >Remove All</button>
    </div>

    {props.options.length === 0 && <p className="widget__message">Please add an option to get started!</p>}
    {
      props.options.map((option, i) => 
        <Option
          key={i}
          optionText={option}
          count={i + 1}
          handleDeleteOption={props.handleDeleteOption}
        />)
    }
  </div>
)