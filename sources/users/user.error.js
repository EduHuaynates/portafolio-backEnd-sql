class UsersCredencialsInUse extends Error {
    constructor(message) {
      super(message);
      this.message =
        message || "El email o usuario ya están asociados con una cuenta.";
      this.status = 409;
      this.name = "UsersCredencialsInUse";
    }
  }
  
  class IncorrectCredencials extends Error {
    constructor(message) {
      super(message);
      this.message =
        message ||
        `Credenciales incorrectas. Asegurate que el username y password sean correctas`;
      this.status = 400;
      this.name = "IncorrectCredencials";
    }
  }
  
  module.exports = {
    UsersCredencialsInUse,
    IncorrectCredencials,
  };
  