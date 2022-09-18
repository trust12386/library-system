使用方法：
&emsp;&emsp;用浏览器打开dist文件夹下的index.html文件


vue 的核心流程
1> 创造了响应式数据
2> 模板转换成 ast 语法树
3> 将 ast 语法树转换成了 render 函数
4> 后续每次数据更新可以只执行 render 函数
5> 为每一个组件赋予以为观察者 watcher,观察自己组件下的 dep
    一个 watcher 对应多个 dep，一个 dep 也可能在多个组件(watcher)被使用
    响应式更新原理就是在初次挂载时会取所依赖的 data 数据，(render 函数中会调用所用的值，此时触发 get 函数)
    此时会触发 get 函数来进行监听操作(这个 dep 会被 watcher 收集，每个 watcher 也会被 dep 收集)
    只有被依赖到的数据才会生成 dep，并不是自身所携带的
    当数据改变时，会触发 dep 的 notify 函数，来通知所有依赖的 watcher 更新
    watcher 的更新方式会生成一个队列，要经过判断去重，防止同一个 watcher 被多次更新，
    采用了 event loop，更新是异步操作，会在同步代码完成后进行更新，这样就避免了多次更新，减少了性能开销

    tip：如果数组单独更新了，视图不会发生变化；如果数组和相应式数据同时更新了，数组的变化也会反映在视图中；
         数组的变化是异步更新的，而响应式数据是同步更新的，那么视图中的响应式数据会被更新，而数组的变化并不会反映在视图中；
         数组和响应式数据都是异步更新的，！(并且数组更新的异步任务优先级要高于响应式数据)，那么数组的变化也会反映在视图中
         主要原因就是watcher的更新是异步更新的，而且是优先级最高的异步任务
         如果数组数据变化是同步的，那么这次更新也会发生，并不是数组本身被监听到了，而是吃了响应式数据的红利。
         (例，如果数组更新是在setTimeout中，而相应式数据更新是在Promise中，数组的变化就不会反映在视图中，反之则可以。)

6> mixin 混入方法的实现，实际上是在 Vue 类上定义的静态方法，将所有相同的方法保存在一个数组中，后续在各自的生命周期中遍历调用。

7> computed 的实现很容易弄混，在初始化时，会为每一个计算属性new 一个计算属性watcher；挂载阶段时会调用$mount 函数，
   此时会 new 一个 更新 watcher，并把该 watcher 推入到 stack 栈中，此后会调用watcher中的get()方法，这时候的getter是_update(_render),当读取到依赖的 computed 属性时会进入到Object.defineProperty的get中，如果dirty为true，进入到对应watcher.evaluate方法中，其中会调用watcher的get方法，并将这个计算watcher推入到stack栈中。之后调用这个watcher中的getter
   方法，此时会读到依赖的data数据，会调用dep.depend()方法与栈中最后一个watcher(即计算属性watcher)相挂钩，完成之后会从
   stack栈中弹出该watcher，之后判断栈中是否还存在更新watcher，遍历该计算属性watcher中之前挂钩的deps与栈中的更新watcher挂钩，完成之后弹出更新watcher。

   当计算属性所依赖的data数据发生变化时所进行的过程：依赖的data数据发生更新，进入对应属性的set方法，调用dep.notify(),遍历所依赖的watcher并调用其update方法，首先调用计算属性watcher的update方法，将该computed属性的dirty值改为true，再调用更新
   watcher的update方法，之后与之前初始化时调用get方法后的过程一致。

8> 在defineComputed的Object.defineProperty中定义了computed的值