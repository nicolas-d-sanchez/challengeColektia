module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    image:{
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial;
};
