import axios from 'axios';
import { faker } from '@faker-js/faker';

type MockResult = {
  mocked: jest.Mocked<typeof axios>;
  mockedResult: {
    data: object;
    status: number;
  }
}

export const mockAxios = (): MockResult => {
  const mocked = axios as jest.Mocked<typeof axios>;
  const mockedResult = {
    data: JSON.parse(faker.datatype.json()),
    status: 200,
  };

  mocked.post.mockResolvedValue(mockedResult);


  return { mocked, mockedResult };
};
