// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act,renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

beforeEach(() => {
  document.body.innerHTML = ''
})

function Counter() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

 

test('exposes the count and increment/decrement functions', async () => {
  render(<Counter/>)
  const count = screen.getByText(/current count/i)
  const decrementBtn = screen.getByRole("button", {name: /decrement/i})
  const incrementBtn = screen.getByRole("button", {name: /increment/i})
  expect(count).toHaveTextContent(/current count: 0/i)
  await userEvent.click(incrementBtn)
  expect(count).toHaveTextContent(/current count: 1/i)
  await userEvent.click(decrementBtn)
  expect(count).toHaveTextContent(/current count: 0/i)
})

test('check results', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)

})



test('check results with renderHook', () => {
  let {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)

})
test('check results with renderHook with different steps', () => {
  let {result} = renderHook(useCounter,{initialProps:{step:2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
test('check results with renderHook with different intialCount', () => {
  let {result} = renderHook(useCounter,{initialProps:{initialCount:2}})
  expect(result.current.count).toBe(2)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)
})


/* eslint no-unused-vars:0 */
