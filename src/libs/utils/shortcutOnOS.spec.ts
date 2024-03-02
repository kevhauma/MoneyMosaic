import { shortcutOnOS } from './shortcutOnOS';

describe('shortcutOnOS', () => {
  let userAgentGetter: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');
  });

  it('should replace "ctrl" with "⌘" on macOS', () => {
    userAgentGetter.mockReturnValue('macOS');
    expect(shortcutOnOS('CTRL + K')).toEqual('⌘ + K');
  });

  it('should replace "ctrl" with "CTRL" on Windows', () => {
    userAgentGetter.mockReturnValue('Windows');
    expect(shortcutOnOS('CTRL + K')).toEqual('CTRL + K');
  });

  it('should replace "alt" with "⌥" on macOS', () => {
    userAgentGetter.mockReturnValue('macOS');
    expect(shortcutOnOS('ALT + A')).toEqual('⌥ + A');
  });

  it('should replace "alt" with "ALT" on Windows', () => {
    userAgentGetter.mockReturnValue('Windows');
    expect(shortcutOnOS('ALT + A')).toEqual('ALT + A');
  });

  it('should handle a combination of keys', () => {
    userAgentGetter.mockReturnValue('macOS');
    expect(shortcutOnOS('CTRL + ALT + S')).toEqual('⌘ + ⌥ + S');
  });

  it('should leave non-OS-specific keys unchanged', () => {
    userAgentGetter.mockReturnValue('Windows');
    expect(shortcutOnOS('SHIFT + A')).toEqual('SHIFT + A');
    userAgentGetter.mockReturnValue('Mac');
    expect(shortcutOnOS('SHIFT + A')).toEqual('SHIFT + A');
  });
});
