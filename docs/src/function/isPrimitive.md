[**ts-study v1.0.0**](../README.md) • **Docs**

***

[ts-study v1.0.0](../README.md) / isPrimitive

# Function: isPrimitive()

> **isPrimitive**(`value`): `boolean`

Checks if the given value is a primitive type (number, string, symbol, or boolean).

## Parameters

• **value**: `unknown`

The value to check.

## Returns

`boolean`

- Returns true if the value is a primitive type, otherwise false.

## Example

```ts
console.log(isPrimitive(1)); // true
console.log(isPrimitive({})); // false
```

## Defined in

function.ts:111
