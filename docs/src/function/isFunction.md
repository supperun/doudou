[**ts-study v1.0.0**](../README.md) • **Docs**

***

[ts-study v1.0.0](../README.md) / isFunction

# Function: isFunction()

> **isFunction**(`value`): `boolean`

Checks if the given value is a function.

## Parameters

• **value**: `unknown`

The value to check.

## Returns

`boolean`

- Returns true if the value is a function, otherwise false.

## Example

```ts
console.log(isFunction(() => {})); // true
console.log(isFunction({})); // false
```

## Defined in

function.ts:130
