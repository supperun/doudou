[**ts-study v1.0.0**](../README.md) • **Docs**

***

[ts-study v1.0.0](../README.md) / cache

# Function: cache()

> **cache**(`fn`): `any`

Caches the result of a function to avoid redundant computations.

## Parameters

• **fn**: `Function`

The function to cache.

## Returns

`any`

- Returns the cached function.

## Example

```ts
const cachedAdd = cache((a: number, b: number) => a + b);
console.log(cachedAdd(1, 2)); // 3
console.log(cachedAdd(1, 2)); // 3 (cached result)
```

## Defined in

function.ts:320
