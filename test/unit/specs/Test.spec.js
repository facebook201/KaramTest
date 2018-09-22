import Vue from 'vue';
import Test from '@/components/Test';

function createVue(component, propsData = {}, mount = false) {
  if (propsData === true || propsData === false) {
    mount = propsData;
    propsData = {};
  }
  const Ctr = Vue.extend(component);
  const vm = new Ctr({ propsData }).$mount();
  return vm;
}

describe('test.vue', () => {
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

  it('测试props', () => {
    let child = createVue(Test, {
      message: 'Hello'
    });
    expect(child.message).to.equal('Hello');
  });

  it('异步更新测试', done => {
    let ays = new Vue(Test).$mount();
    ays.msg = '异步更新';
    console.log(ays.msg);
    Vue.nextTick(_ => {
      console.log(ays.msg);
      expect(ays.msg).to.equal('异步更新');
      done();
    });
  });
});
