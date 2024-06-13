import { cpfPipe } from './cpf.pipe';

describe('cpfPipe', () => {
  it('create an instance', () => {
    const pipe = new cpfPipe();
    expect(pipe).toBeTruthy();
  });
});
