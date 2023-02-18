import type { AuthenticationParams } from '../use-cases/authentication';
import { faker } from '@faker-js/faker';

function mockAuthentication(): AuthenticationParams {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

export default mockAuthentication;
