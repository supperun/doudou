[**ts-study v1.0.0**](../README.md) • **Docs**

***

[ts-study v1.0.0](../README.md) / isDef

# Function: isDef()

> **isDef**(`v`): `boolean`

Checks if the given value is defined (not undefined or null).

## Parameters

• **v**: `unknown`

The value to check.

## Returns

`boolean`

- Returns true if the value is defined, otherwise false.

## Example

```ts
console.log(isDef({})); // true
console.log(isDef(undefined)); // false
console.log(isDef(null)); // false
```

## Defined in

function.ts:69
