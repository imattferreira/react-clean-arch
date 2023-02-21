import axios from 'axios';
import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from './axios-http-client';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: JSON.parse(faker.datatype.json()),
  status: 200,
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient<unknown, unknown> => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json())
});

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL, HTTP verb and body', async () => {
    const sut = makeSut();
    const { url, body } = mockPostRequest();

    await sut.post({ url, body });

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });

  it('should return the correct status code and body', async () => {
    const sut = makeSut();

    const result = await sut.post(mockPostRequest());

    expect(result).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    });
  });
});
