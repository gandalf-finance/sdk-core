export { computePriceImpact } from './computePriceImpact'
export { sortedInsert } from './sortedInsert'
export { sqrt } from './sqrt'
export { validateAndParseAddress } from './validateAndParseAddress'
import { getAddress } from '@ethersproject/address';
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}