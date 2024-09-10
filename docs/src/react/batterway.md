# React start

::: tip batter way
:::

## `momo`

允许组件在 props 未曾改变下，跳过渲染组件的操作并直接复用最近一次渲染的结果。

React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。

默认情况下其只会对复杂对象做浅层对比，可自定义的比较函数的第二个参数。

```js
const MyComponent = memo((props) => {
  /* 使用 props 渲染 */
}, areEqual)
const areEqual = (prevProps, nextProps) => {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
```

## useMome

在每次重新渲染的时候能够缓存计算的结果

```js
const contextValue = useMemo(() => {
  return { token, setToken }
}, [token])
```

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 `memoized` 值。

传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行不应该在渲染期间内执行的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

## useCallback

缓存函数的引用地址，仅在依赖项改变时才会更新

```js
import logo from "./logo.svg"
import "./App"
import { useCallback, memo } from "react"

const child = memo(({ click }) => {
  console.log("child render")
  return (
    <>
      <button onClickCapture={click}>+++</button>
    </>
  )
})

function App() {
  const ss = (e) => {
    console.log(e)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <child click={ss}></child>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
```

点击按钮，可以发现即使子组件使用 memo 包裹了，但还是更新了，控制台打印出“子组件渲染”。这是因为父组件 App 每次更新时，函数 handleClick 每次都返回了新的引用地址，因此对于子组件来说每次传入的都是不一样的值，从而触发重渲染。
同样的，要减少使用通过内联函数绑定事件。每次父组件更新时，匿名函数都会返回一个新的引用地址，从而触发子组件的重渲染

```js
<Mycomponent handleClick={() => console.log("内联函数绑定")} />
```

使用 useCallback 可以缓存函数的引用地址，将 ssk 改为

```js
const ss = useCallback((e) => {
  console.log(e)
}, [])
```

## useTransition

```js

```

## useDeferredValue

该 hook 与使用防抖和节流去延迟更新的用户空间 hooks 类似。使用 useDeferredValue 的好处是，React 将在其他工作完成（而不是等待任意时间）后立即进行更新，并且像 startTransition 一样，延迟值可以暂停，而不会触发现有内容的意外降级。

```js
function Typeahead() {
  const query = useSearchQuery("")
  const deferredQuery = useDeferredValue(query)

  // Memoizing 告诉 React 仅当 deferredQuery 改变，
  // 而不是 query 改变的时候才重新渲染
  const suggestions = useMemo(
    () => <SearchSuggestions query={deferredQuery} />,
    [deferredQuery]
  )

  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">{suggestions}</Suspense>
    </>
  )
}
```

记忆该子组件告诉 React 它仅当 deferredQuery 改变而不是 query 改变的时候才需要去重新渲染。

## 尽量避免使用 index 作为 key

在渲染元素列表时，尽量避免将数组索引作为组件的 key。如果列表项有添加、删除及重新排序的操作，使用 index 作为 key，可能会使节点复用率变低，进而影响性能

使用数据源的 id 作为 key

```js
const MyComponent = () => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

## 代码分割 懒加载

### import()

在你的应用中引入代码分割的最佳方式是通过动态 import() 语法。

```js
import("./math").then((math) => {
  console.log(math.add(16, 26))
})
```

### React.lazy

通过 React.lazy 和 React.Suspense 实施代码分割策略，将 React 应用细分为更小的模块，确保在具体需求出现时才按需加载相应的部分

```js
export const lazyLoad = (cb) => {
  const _Component = lazy(cb)
  const _load = (Component) => {
    return (
      <Suspense fallback={Loading()}>
        <Component />
      </Suspense>
    )
  }
  return _load(_Component)
}
```

## 组件卸载时的清理

在组件卸载时清理全局监听器、定时器等。防止内存泄漏（应该清理掉的内存，没有清理掉）影响性能。

```js
const resizeHandle = () => {
  console.log("resize")
}
useEffect(() => {
  timer.current = setInterval(draw, 50)
  window.addListener("resize", resizeHandle)
  return () => {
    if (timer.current) {
      clearInterval(timer.current)
      window.removeListener("resize", resizeHandle)
    }
  }
})
```
