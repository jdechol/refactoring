import { sayHello } from '../src/module';
import { sayHi } from '../src/module2';
describe('module', function () {

    const hello = sayHello('World');
    const hi = sayHi();

    it('should display proper hello', function () {
        expect(hello).toBe('Hello World!');
    });

    it('should display proper hi', function () {
        expect(hi).toBe('hi');
    });

});
