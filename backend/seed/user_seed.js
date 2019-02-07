const User = require('../models/User');
const faker = require('faker');
const mongoose = require('mongoose');
const { mongoURI } = require('../config/secrets');

const createUserSeeds = () => {
  const createCohortSet = () => {
    let res = [];
    for (let i = 0; i < 10; i++) {
      res.push(faker.name.jobType());
    }
    return res;
  };
  let userSeeds = [];
  for (let i = 0; i < 30; i++) {
    const fakeName = faker.fake('{{name.firstName}} {{name.lastName}}');
    const sentenceOne = faker.lorem.sentence().toLowerCase();
    const sentenceTwo = faker.lorem.sentence().toLowerCase();

    let cohortsSet = createCohortSet();

    const newUser = new User({
      name: fakeName,
      email: 'test@test.test',
      password: 'test123',
      type: 'patient',
      cohorts: [],
      details: `${fakeName} is ${sentenceOne} ${fakeName} is ${sentenceTwo}`,
      avatar: faker.image.avatar(),
      // bookmarked: { type: Array },
    });
    // fillin cohorts; only if its not duple
    for (let i = 0; i < 5; i++) {
      let cohort = cohortsSet[Math.floor(Math.random() * cohortsSet.length)];
      if (!newUser.cohorts.includes(cohort)) {
        newUser.cohorts.push(cohort);
      }
    }
    userSeeds.push(newUser);
  }
  return userSeeds;
};
const dbConnect = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('mongodb connected!!'))
    .catch(err => console.log(err));
};

const dbDisconnect = () => {
  mongoose.disconnect(() => console.log('db disconnect'));
};
const saveUserSeeds = users => {
  let done = 0;
  users.forEach(user => {
    user.save((err, res) => {
      done++;
      if (done === users.length) {
        dbDisconnect();
      }
    });
  });
};

const run = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log('db connected!');
      saveUserSeeds(createUserSeeds());
    })
    .catch(err => console.log(err));
};

run();
