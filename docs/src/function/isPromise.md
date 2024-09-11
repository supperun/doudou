[**ts-study v1.0.0**](../README.md) • **Docs**

***

[ts-study v1.0.0](../README.md) / isPromise

# Function: isPromise()

> **isPromise**(`val`): `boolean`

Checks if the given value is a Promise.

## Parameters

• **val**: `any`

The value to check.

## Returns

`boolean`

- Returns true if the value is a Promise, otherwise false.

## Example

```ts
console.log(isPromise(Promise.resolve())); // true
console.log(isPromise({})); // false
```

## Defined in

function.ts:201
