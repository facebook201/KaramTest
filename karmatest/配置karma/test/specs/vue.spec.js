import Vue from 'vue';
import HelloWorld from '@/HelloWorld';

describe('hellowrold.vue', function(){
  it('should render', function(){
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor().$mount();
    assert(vm.$el.querySelector('.hello h1').textContent === 'Welcome to vue test');
  });
});
