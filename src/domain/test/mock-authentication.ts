import { AuthenticationParams } from "@/domain/usecases/authentication";
import { randEmail, randPassword } from '@ngneat/falso'

export const mockAuthentication = (): AuthenticationParams => ({
  email: randEmail(), 
  password: randPassword()
})