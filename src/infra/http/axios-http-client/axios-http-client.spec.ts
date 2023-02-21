import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';
import { mockAxios } from '@/infra/tests';
import { mockPostRequest } from '@/data/test';

type SutTypes = {
  sut: AxiosHttpClient<unknown, unknown>;
  mockedAxios: {
    mocked: jest.Mocked<typeof axios>;
    mockedResult: {
      status: number;
      data: object;
    }
  };
}

jest.mock('axios');


const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return { sut, mockedAxios };
};



describe('AxiosHttpClient', () => {
  it('should call axios with correct URL, HTTP verb and body', async () => {
    const { sut, mockedAxios } = makeSut();
    console.log('🚀 ~ file: axios-http-client.spec.ts:32 ~ it ~ mockedAxios', mockedAxios);
    const { url, body } = mockPostRequest();

    await sut.post({ url, body });

    expect(mockedAxios.mocked).toHaveBeenCalledWith(url, body);
  });

  it('should return the correct status code and body', async () => {
    const { mockedAxios, sut } = makeSut();

    const result = await sut.post(mockPostRequest());

    expect(result).toEqual({
      statusCode: mockedAxios.mockedResult.status,
      body: mockedAxios.mockedResult.data
    });
  });
});
