[**ts-study v1.0.0**](../README.md) • **Docs**

***

[ts-study v1.0.0](../README.md) / makeMap

# Function: makeMap()

> **makeMap**(`str`, `expectsLowerCase`): `Function`

Creates a map from a string of comma-separated keys and returns a function to check if a key is in the map.

## Parameters

• **str**: `string`

The string of comma-separated keys.

• **expectsLowerCase**: `boolean`

Whether the keys in the map should be treated as lowercase.

## Returns

`Function`

- Returns a function that checks if a key is in the map.

## Example

```ts
const map = makeMap('a,b,c', true);
console.log(map('A')); // true
console.log(map('D')); // false
```

## Defined in

function.ts:269
