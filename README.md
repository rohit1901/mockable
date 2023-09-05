# mockable: Automated Mocking for Unit Testing
![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The `mockable` library simplifies unit testing by automating the generation of mock implementations for TypeScript classes and interfaces. With `mockable`, you can quickly create mock objects that adhere to the type definitions of your original code, reducing the need for manual mock creation and maintenance.

## Installation

```bash
npm install mockable --save-dev
```

## Usage

### 1. Annotate Classes or Interfaces

Use the `@Mockable` decorator to indicate which classes or interfaces you want to mock. This will trigger the automated mock generation process.

```typescript
import { Mockable } from 'mockable';

@Mockable
class UserService {
  getUser(id: number): Promise<User> {
    // Actual implementation fetching user from a server
  }
}
```

### 2. Import and Use Mocks in Tests

In your test files, import the generated mock implementations and use them in your tests. The mock implementations will match the methods and properties of the original class/interface.

```typescript
import { MockUserService } from 'mockable';

// Use the mock in your tests
jest.mock('UserService', () => MockUserService);

// Example test using the mock
test('should return a user', async () => {
  MockUserService.getUser.mockResolvedValue({ id: 1, name: 'John' });

  const user = await someFunctionThatUsesUserService();

  expect(user.name).toBe('John');
});
```

### 3. Customize Mock Behavior

You can customize the behavior of the mock methods using Jest's mocking capabilities.

```typescript
MockUserService.getUser.mockResolvedValue({ id: 1, name: 'Custom Name' });
```

## Features

- Automatic generation of mock implementations for annotated classes/interfaces.
- Retains type safety by inferring method signatures and return types from the original code.
- Customizable mock behavior using Jest's mocking features.
- Reduces boilerplate and speeds up unit test writing and maintenance.

## Examples

For more detailed examples and advanced usage, please refer to the [Examples](./src/examples) directory in this repository.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).
