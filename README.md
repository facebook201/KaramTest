## Vue karma + mocha

**Karma** 是基于Node.js的javascript测试执行过程管理工具。

**Mocha** 是一个测试框架 在vue-cli 中配合断言实现单元测试

[断言库的API](www.jianshu.com/p/f200a75a15d2)

[阮一峰老师的mocha教程](<http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html>)

* BDD

  expect 和 should 是BDD的风格。 二者使用相同的链式语言来组织断言  expect使用构造函数来创建断言对象实例，而should通过为Object.prototype新增方法来实现断言（所以should不支持IE）；`expect`直接指向`chai.expect`，而`should`则是`chai.should()`。




npm run unit 执行过程

* 开启karma执行运行环境
* 使用mocha 逐个测试用chai断言写的测试用例
* 在终端显示测试结果
* 如果测试成功 karma-coverage 会在./test/unit/coverage 文件夹中生成测试覆盖率结果的网页



#### karma 配置



```javascript
var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    // 浏览器
    browsers: ['PhantomJS'],
    // 测试框架
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    // 测试报告
    reporters: ['spec', 'coverage'],
    // 测试入口文件
    files: ['./index.js'],
    // 预处理器
    preprocessors: {
      './index.js': ['webpack', 'source 22map']
    },
    // webpack 配置
    webpack: webpackConfig,
    // webpack 中间件
    webpackMiddleware: {
      noInfo: true
    },
    // 测试覆盖率
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
```



官方的例子

```javascript
import Vue from 'vue' // 生成Vue的实例
import HelloWorld from '@/components/HelloWorld' // 导入组件

// 测试脚本里应该包括一个或多个describe块 称为测试套件
describe('HelloWorld.vue', () => {
  // 每个describe应该包含一个或多个it块 称为测试用例 test case
  it('should render correct contents', () => {
    // 获得Hello 组件实例
    const Constructor = Vue.extend(HelloWorld)
    // 将组件挂载到DOM上
    const vm = new Constructor().$mount()
    // 断言: DOM 中class为hello的元素中的h1元素的文本为Welcome to Your Vue.js App'
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
```



* 测试脚本都放在 test/unit/specs/ 目录
* 命名方式 [组价].spec.js
* 断言 就是最组件做一些操作 并预言产生的结果 如果测试结果和断言结果相同 测试通过
* 单元测试 默认测试src目录下除了 main.js 之外的所有文件 可在 test/unit/index.js 文件中修改



##### 异步组件

```javascript
it('异步请求应该返回一个'，done => {
  request.get(url).end(function(res, err) {
    expect(res).to.be.an('object');
    done();
  });
});
```

了解 describe 钩子

```javascript
describe('hook', function () {
  before(function () {
    // 测试用例之前执行
  })
  after(function () {
    // 测试用例之后执行
  })
  beforeEach(function () {
    // 本区块的每个测试用例之前执行
  })
  afterEach(function () {
    // 本区块的每个测试用例之后执行
  })
})
```



#### utils 

Element 有一个单元测试工具脚本 utils.js  封装了Vue单元测试中常用的方法。 

```javascript
import Vue from 'vue';
import Element from 'main/index.js';

Vue.use(Element);

let id = 0;

const createElm = function() {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
};

/**
 * 回收 vm
 * @param  {Object} vm
 */
exports.destroyVM = function(vm) {
  vm.$destroy && vm.$destroy();
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
};

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm());
};

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createTest = function(Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const elm = createElm();
  const Ctor = Vue.extend(Compo);
  return new Ctor({ propsData }).$mount(mounted === false ? null : elm);
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
exports.triggerEvent = function(elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
exports.triggerClick = function(elm, ...opts) {
  exports.triggerEvent(elm, 'mousedown', ...opts);
  exports.triggerEvent(elm, 'mouseup', ...opts);

  return elm;
};

/**
 * 触发 keydown 事件
 * @param {Element} elm
 * @param {keyCode} int
 */
exports.triggerKeyDown = function(el, keyCode) {
  const evt = document.createEvent('Events');
  evt.initEvent('keydown', true, true);
  evt.keyCode = keyCode;
  el.dispatchEvent(evt);
};
```

根据上面的util.js 的 destroyVM 和 createTest 方法的用法以及如何获取目标元素进行测试



**一些异步操作**

```javascript
import { createTest } from '../utils';
import Click from '@/components/Click';

describe('click.vue', () => {
  let vm;
  // done 在it块执行的时候 传入一个done函数。 当测试结束后 必须显示调用这个函数 告诉mocha测试结束了
  // 否则mocha无法知道测试是否结束
  it('click', done => {
    vm = createTest(Click, {
      AddNum: 10,
      InitNum: 11
    });
    let buttonElm = vm.$el.querySelector('button');
    buttonElm.click();
    buttonElm.click();
    buttonElm.click();

    setTimeout(_ => {
      expect(vm.ResultNum).to.equal(11);
      expect(vm.$el.querySelector('.click-num').textContent).to.equal('点击了5次');
      done();
    }, 100);
  });
});

```



### 补充

vue-cli 默认的测试工具 没有按照 karma-chrome-launcher。所有并不是流量测试。 运行命令也是 run test。然后我安装了 karma-chome-launcher 插件。改一点 karma.conf.js的配置

```javascript
// karma.conf.js
browsers: ['Chrome'],
    
// 启动命令 // 下面的命令就可以在浏览器里面看到
karma start test/unit/karma.conf.js


// npm run unit 对应的命令是 --single-run 运行一次
cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run
```



#### 总结

* utils.js 方法包含了大多数Vue组件测试的笔记
* vm.$nextTick 和 vm.\$ref 都是异步的。 所以需要在里面使用done方法。**注意是在it 块里面调用**
* 大多数查找是否存在某个class 通过 classList.contains 获得。 结果 true 或 false。
  * vm.$el.classList.contains('el-button-parimary');
  * vm.$el.querySelector('.someclass').innerText
* 异步测试 done结尾 告诉 mocha 测试结束
* 按钮点击 通过 btn.click() 方法实现