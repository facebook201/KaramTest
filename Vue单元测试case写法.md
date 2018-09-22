### Vue 单元测试



> 单元测试的关注点

* 组件加载之后 各数据模型是否符合预期
* 定义的方法是否可用
* filter是否可用
* 带有props的组件 数据能否正常传递
* 异步更新 DOM的情况





#### 组件加载后的状态

要测试组件加载后的状态 需要将Vue组件生成实例 并检测挂载后实例的数据状态。

```vue
<template>
  <div class="test">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      msg: 'Test'
    };
  },
  mounted() {
    this.msg = 'hello';
  }
};
</script>

```



组件加载后的值是hello 写一个测试代码

```javascript
describe('test.vue', () => {
  it('组件加载后 meg的内容应该为hello', () => {
    let vm = new Vue(Test).$mount();
    expect(vm.msg).to.equal('hello');
  });
});

```



#### 测试组件的方法 

测试组件的方法。 vue将data 和 method 都挂载在vue的实例的根节点下。 所以测试组件中的方法和上面状态一样。

```javascript
  // 方法测试
  it('方法测试', () => {
    let vm = new Vue(Test).$mount();
    vm.setMessage('测试方法');
    expect(vm.msg).to.equal('测试方法');
  });

  // filter 过滤器 测试 filter 是纯函数
  it('过滤器把app转换成大写APP', () => {
    let appStr = Test.filters.upperCase('app');
    expect(appStr).to.equal('APP');
  });
```



#### 测试props 这个官方文档有

```javascript
import Vue from 'vue'
import MyComponent from './MyComponent.vue'

// 挂载元素并返回已渲染的文本的工具函数
function getRenderedText (Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm.$el.textContent
}

describe('MyComponent', () => {
  it('renders correctly with different props', () => {
    expect(getRenderedText(MyComponent, {
      msg: 'Hello'
    })).toBe('Hello')

    expect(getRenderedText(MyComponent, {
      msg: 'Bye'
    })).toBe('Bye')
  })
})
```

#### 异步更新断言

```javascript
it('updates the rendered message when vm.message updates', done => {
  const vm = new Vue(MyComponent).$mount()
  vm.message = 'foo'

  // 在状态改变后和断言 DOM 更新前等待一刻
  Vue.nextTick(() => {
    expect(vm.$el.textContent).toBe('foo')
    done()
  })
})
```

