import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'
import { randUrl, randJSON } from '@ngneat/falso'
import { HttpPostParams } from "@/data/protocols/http"
import { randomInt } from "crypto"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: randJSON(),
  status: randomInt(800)
}

mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: randUrl(),
  body: randJSON()
})

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL, verb and body', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return the correct statusCode and body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})