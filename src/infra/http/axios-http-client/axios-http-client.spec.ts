import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'
import { randUrl } from '@ngneat/falso'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL', async () => {
    const url = randUrl()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})