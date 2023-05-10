import React from 'react'
import Stepper from '../../src/Components/stepper'
import { mount } from 'cypress/react18'

describe('<Stepper />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Stepper />)
    
  })
})
