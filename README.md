# Humble Supeheros

Developed by Hanibal


## What's inside?

This a mono repo includes the following packages/apps:

### Apps

- `backend`: a [Nest.js](https://nestjs.org/) app
- `frontend`: a [vite.js](https://vite.org/) app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).


### Develop

To develop all apps and packages, run the following command:

```
cd humble-superhero
pnpm dev
```

### Future Enhancements

If I have time, I would better handle the validation on the frontend and use SQLite for the database, along with adding new attributes.