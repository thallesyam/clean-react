import { randJSON, randUrl } from "@ngneat/falso";
import { HttpPostParams } from "../protocols/http";

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: randUrl(),
  body: randJSON()
})
