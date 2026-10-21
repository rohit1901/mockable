# mockable

Generate type-safe Jest mocks for TypeScript classes and interfaces marked with `@Mockable`.

## Installation

```bash
npm install --save-dev mockable
```

## Usage

Mark the types you want to mock:

```ts
import { Mockable } from 'mockable';

@Mockable()
export class UserService {
  getUser(id: number): Promise<{ id: number; name: string }> {
    throw new Error('Not implemented');
  }
}
```

Generate mocks:

```ts
import { generateMocks } from 'mockable';

await generateMocks({
  inputDir: 'src/services',
  outputDir: 'src/test-mocks',
});
```

Use the generated factory in a Jest test:

```ts
import { createUserServiceMock } from './test-mocks/mocks';

const userService = createUserServiceMock();
userService.getUser.mockResolvedValue({ id: 1, name: 'Ada' });

expect(await userService.getUser(1)).toEqual({ id: 1, name: 'Ada' });
```

## Output

For each `@Mockable` declaration, `mockable` creates a factory returning a `jest.Mocked<T>` instance. Methods are initialized as Jest mock functions, so return values, implementations, and call expectations can be configured with the normal Jest API.

## Notes

- Both classes and interfaces are supported.
- Input is discovered recursively from `inputDir`.
- Generated files are formatted with Prettier and should not be edited manually.
- Non-function properties are not automatically populated; add values explicitly in tests when required.

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
