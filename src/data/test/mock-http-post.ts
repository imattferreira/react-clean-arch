import { faker } from '@faker-js/faker';
import { HttpPostParams } from '../protocols/http';

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json())
});
