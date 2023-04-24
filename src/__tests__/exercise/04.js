// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'
// import faker from 'faker'

// function buildLoginForm(overrides) {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     ...overrides
//   }
// }

const buildLoginForm = build({
    fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password())
  },
});


test('submitting the form calls onSubmit with username and password', async () => {

  let handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit}/>)
  const {username, password} = buildLoginForm()
  await userEvent.type(screen.getByLabelText(/username/i),username)
  await userEvent.type(screen.getByLabelText(/password/i),password)
  await userEvent.click(screen.getByText(/submit/i))
  expect(handleSubmit).toHaveBeenCalledWith({username, password});
  expect(handleSubmit).toHaveBeenCalledTimes(1);

})

/*
eslint
  no-unused-vars: "off",
*/
