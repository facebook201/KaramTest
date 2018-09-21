import { createTest } from '../utils';
import Click from '@/components/Click';

describe('click.vue', () => {
  let vm;

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
      expect(vm.ResultNum).to.equal(41);
      expect(vm.$el.querySelector('.click-num').textContent).to.equal('点击了3次');
      done();
    }, 100);
  });
});
