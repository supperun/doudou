[**ts-study v1.0.0**](../README.md) • **Docs**

***

[ts-study v1.0.0](../README.md) / replacer

# Function: replacer()

> **replacer**(`_key`, `val`): `any`

Replacer function for JSON.stringify to handle circular dependencies.

## Parameters

• **\_key**: `any`

The key of the property.

• **val**: `any`

The value of the property.

## Returns

`any`

- Returns the value or its value if it's a ref.

## Defined in

function.ts:234
