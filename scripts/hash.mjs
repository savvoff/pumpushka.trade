import { createHash } from 'crypto';

export const hashObject = (obj) =>
  createHash('sha256').update(JSON.stringify(obj)).digest('hex');
