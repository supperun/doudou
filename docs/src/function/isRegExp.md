[**ts-study v1.0.0**](../README.md) • **Docs**

***

[ts-study v1.0.0](../README.md) / isRegExp

# Function: isRegExp()

> **isRegExp**(`v`): `boolean`

Checks if the given value is a RegExp object.

## Parameters

• **v**: `unknown`

The value to check.

## Returns

`boolean`

- Returns true if the value is a RegExp object, otherwise false.

## Example

```ts
console.log(isRegExp(/regex/)); // true
console.log(isRegExp({})); // false
```

## Defined in

function.ts:172
