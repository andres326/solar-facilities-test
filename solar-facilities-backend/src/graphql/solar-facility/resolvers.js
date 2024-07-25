const queries = {
  solarFacility: (root, args) => {
    return {
      id: "12345",
      name: "Solar Panel 1",
      power: 2,
    };
  },
  solarFacilities: (root, args) => {
    return [
      {
        id: "12345",
        name: "Solar Panel 1",
        power: 2,
      },
      {
        id: "123345",
        name: "Solar Panel 2",
        power: 1,
      },
    ];
  },
};

const mutations = {
  createSolarFacility: (root, args) => {
    const {
      input: { name, power },
    } = args;
    console.log({ args });
    const newUser = {
      id: "54321",
      name,
      power,
    };

    return newUser;
  },
};

export const resolvers = { queries, mutations };
