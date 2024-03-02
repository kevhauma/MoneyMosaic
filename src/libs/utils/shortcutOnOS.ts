enum OS {
  MAC,
  WIN,
  LINUX,
}

const getOS = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('mac')) {
    return OS.MAC;
  } /*else if (userAgent.includes('win')) {
    return OS.WIN;
  } else if (userAgent.includes('linux')) {
    return OS.LINUX;
  }*/ else {
    return OS.WIN;
  }
};

const KeyMap = {
  ctrl: {
    [OS.WIN]: 'CTRL',
    [OS.MAC]: '⌘',
  },
  alt: {
    [OS.WIN]: 'ALT',
    [OS.MAC]: '⌥',
  },
};

/**
 * @param shortcut E.g.: 'CTRL + K'
 * @return On MacOS: '⌘ + K'
 */
export const shortcutOnOS = (shortcut: string): string => {
  const os = getOS();
  const keys = Object.keys(KeyMap).join('|');
  const regex = new RegExp(keys, 'gi');

  return shortcut.replace(
    regex,
    (match) => KeyMap[match.toLowerCase() as keyof typeof KeyMap]?.[os]
  );
};
