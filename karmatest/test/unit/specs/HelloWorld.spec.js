import Vue from 'vue'; // 生成Vue的实例
import HelloWorld from '@/components/HelloWorld'; // 导入组件

// 测试脚本里应该包括一个或多个describe块 称为测试套件
describe('HelloWorld.vue', () => {
  // 每个describe应该包含一个或多个it块 称为测试用例 test case
  it('should render correct contents', () => {
    // 获得Hello 组件实例
    const Constructor = Vue.extend(HelloWorld);
    // 将组件挂载到DOM上
    const vm = new Constructor().$mount();
    // 断言: DOM 中class为hello的元素中的h1元素的文本为Welcome to Your Vue.js App'
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
