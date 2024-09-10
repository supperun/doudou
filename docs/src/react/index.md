# React start

::: tip Why? React Hook
简而言之 `JavaScript` `function` 是第一等公民。所谓的 class 也只是 function 换了个皮，最终还是要编译成 function。函数式编程，对过程封装，入参与返回值的自定义映射。代码逻辑清楚，使用逻辑清楚，函数式编程足够优秀。
:::

## 在组件之间复用状态逻辑很难

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。一些解决此类问题的方案，比如 `render props` 和 高阶组件。但是这类方案需要重新组织你的组件结构。如果你在 React DevTools 中观察过 React 应用，你会发现由 `providers`，`consumers`，`高阶组件`，`render props` 等其他抽象层组成的组件会形成“嵌套地狱”。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑**。

## 复杂组件变得难以理解

我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 `componentDidMount` 和 `componentDidUpdate` 中获取数据。但是，同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

为了解决这个问题，**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分**。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

## 难以理解的 class

必须去理解 JavaScript 中 this 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。如果不使用 ES2022 public class fields，这些代码非常冗余。大家可以很好地理解 props，state 和自顶向下的数据流。
**Hook 使你在非 class 的情况下可以使用更多的 React 特性。React 组件一直更像是函数。而 Hook 则拥抱了函数**。
