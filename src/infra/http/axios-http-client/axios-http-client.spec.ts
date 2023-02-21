import axios from 'axios';
import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from './axios-http-client';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json())
});

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL,TTP verb and body', async () => {
    const sut = makeSut();
    const { url, body } = mockPostRequest();

    await sut.post({ url, body });

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });
});
