import { test as _test } from './test';
import { test, expect } from 'vitest';

test('test', () => {
  expect(_test(1, 2)).equal(3);
});
