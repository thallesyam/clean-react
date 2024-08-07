import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { randEmail, randPassword, randWord } from '@ngneat/falso'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import { AuthenticationSpy } from '@/presentation/test'


type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (sut: RenderResult, email = randEmail(), password = randPassword()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = randEmail()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = randPassword()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const passwordStatus = sut.getByTestId(`${fieldName}-status`)
  expect(passwordStatus.title).toBe(validationError || 'Tudo certo!')
  expect(passwordStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe("<Login />", () => {
  afterEach(() => {
    cleanup()
  })
  
  test("should start with initial state", () => {
    const validationError = randWord({ length: 15 }).join(" ")
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('errorWrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })

  test("should show email error if Validation fails", () => {
    const validationError = randWord({ length: 15 }).join(" ")
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })

  test("should show password error if Validation fails", () => {
    const validationError = randWord({ length: 15 }).join(" ")
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })

  test("should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  test("should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password')
  })

  test("should enable submit button if form is valid", () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test("should show spinner on submit", () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test("should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut()
    const email = randEmail()
    const password = randPassword()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})