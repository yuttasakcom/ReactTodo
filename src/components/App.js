import React from 'react'

import Header from './Header'
import Action from './Action'
import Options from './Options'
import AddOption from './AddOption'
import OptionModal from './OptionModal'

class App extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)
      if (options) {
        this.setState(()=> ({options}))
      }
    } catch(e) {

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }

  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists'
    }

    this.setState((prevState) => ({options: prevState.options.concat(option)}))
  }

  handlePick = () => {
    let randomNum = Math.floor(Math.random() * this.state.options.length)
    let option = this.state.options[randomNum]
    this.setState(() => ({selectedOption: option}))
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  }

  handleDeleteOptions = () => {
    this.setState(() => ({options: []}))
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({selectedOption: undefined}))
  }

  render() {
    const title = 'Indecision'
    const subtitle = 'Put your life in the hands of a computer'
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action 
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOption={this.handleDeleteOption}
              handleDeleteOptions={this.handleDeleteOptions}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    )
  }
}

export default App