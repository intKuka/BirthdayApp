import { UserEntity } from 'src/entities/user.entity';
import { ContactTypes } from 'src/types/contact-types.enum';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(UserEntity, (faker) => {
  const from = new Date();
  from.setDate(from.getDate() - 2); // set max date in past
  const to = new Date();
  to.setDate(to.getDate() + 2); // set max date in future

  const contacts = faker.helpers.arrayElements<{
    type: ContactTypes;
    value: string;
  }>([
    { type: ContactTypes.Phone, value: faker.phone.number() },
    { type: ContactTypes.Email, value: faker.internet.email() },
    { type: ContactTypes.Social, value: faker.internet.url() },
  ]);

  const user = {
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(['admin', 'user']),
    birthdate: faker.helpers.maybe(() => faker.date.between({ from, to }), {
      probability: 0.7,
    }),
    contacts,
  } as UserEntity;

  return user;
});
