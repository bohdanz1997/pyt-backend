const templateProps = {
  name: { type: 'string' },
  description: { type: 'string' },
  position: { type: 'integer' },
}

export const templateCreateSchema = {
  properties: {
    ...templateProps,
    exercises: {
      type: 'array',
      item: {
        type: 'integer'
      },
    },
  },
  required: ['name'],
}

export const templateUpdateSchema = {
  properties: templateProps,
}
