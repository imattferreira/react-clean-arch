import axios from 'axios';
import { HttpPostParams } from '@/data/protocols/http';

export class AxiosHttpClient {
  async post ({ url }: HttpPostParams<unknown>): Promise<void> {
    await axios(url);
  }
}
