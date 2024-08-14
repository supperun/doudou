# vue3

> 直接尝试写 Vue3 组合式代码

<!--
我们可以使用 v-model 指令在状态和表单输入之间创建双向绑定。
-->

::: details

```vue
<!--
我们可以使用 v-model 指令在状态和表单输入之间创建双向绑定。
-->
<script setup>
import { ref } from 'vue'

const text = ref('Edit me')
const checked = ref(true)
const checkedNames = ref(['Jack'])
const picked = ref('One')
const selected = ref('A')
const multiSelected = ref(['A'])
</script>

<template>
  <h2>Text Input</h2>
  <input v-model="text" />
  <p>{{ text }}</p>

  <h2>Checkbox</h2>
  <input type="checkbox" id="checkbox" v-model="checked" />
  <label for="checkbox">Checked: {{ checked }}</label>

  <!--
    多个复选框可以绑定到
    相同的 v-model 数组
  -->
  <h2>Multi Checkbox</h2>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <p>Checked names: {{ checkedNames }}</p>

  <h2>Radio</h2>
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <br />
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <p>Picked: {{ picked }}</p>

  <h2>Select</h2>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>Selected: {{ selected }}</p>

  <h2>Multi Select</h2>
  <select v-model="multiSelected" multiple style="width:100px">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>Selected: {{ multiSelected }}</p>
</template>
```

:::

<script setup>
import { ref } from 'vue'

const text = ref('Edit me')
const checked = ref(true)
const checkedNames = ref(['Jack'])
const picked = ref('One')
const selected = ref('A')
const multiSelected = ref(['A'])
</script>

<h2>Text Input</h2>
<input v-model="text">
<p>{{ text }}</p>

<h2>Checkbox</h2>
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">Checked: {{ checked }}</label>

<!--
  多个复选框可以绑定到
  相同的 v-model 数组
-->
<h2>Multi Checkbox</h2>
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<p>Checked names: {{ checkedNames }}</p>

<h2>Radio</h2>
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<p>Picked: {{ picked }}</p>

<h2>Select</h2>
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<p>Selected: {{ selected }}</p>

<h2>Multi Select</h2>
<select v-model="multiSelected" multiple style="width:150px">
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<p>Selected: {{ multiSelected }}</p>
