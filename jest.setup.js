import { TextEncoder } from 'text-encoding';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

import { TextDecoder } from 'util';
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
