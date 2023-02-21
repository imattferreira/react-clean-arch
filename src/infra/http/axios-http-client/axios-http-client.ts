import axios from 'axios';
import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient<T, R> implements HttpPostClient<T, R> {
  async post ({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const response = await axios.post(url, body);

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
