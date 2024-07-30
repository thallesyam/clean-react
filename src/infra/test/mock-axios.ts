import { randJSON, incrementalNumber } from "@ngneat/falso"
import axios from "axios"

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({
    data: randJSON(),
    status: incrementalNumber()
  })
  return mockedAxios
}