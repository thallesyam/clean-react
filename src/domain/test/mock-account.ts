import { AuthenticationParams } from "@/domain/usecases/authentication";
import { randEmail, randPassword, randUuid } from '@ngneat/falso'
import { AccountModel } from "../models/account-model";

export const mockAuthentication = (): AuthenticationParams => ({
  email: randEmail(), 
  password: randPassword()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: randUuid()
})