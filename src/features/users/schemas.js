export const authSchema = {
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    name: { type: "string" },
  },
  required: ["email", "password"],
}

export const sessionCreateSchema = {
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
}

export const sessionDropSchema = {
  properties: {
    token: { type: "string" },
  },
}
