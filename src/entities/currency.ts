import { ELFChainToken } from './elfChainToken';
import { NativeCurrency } from './nativeCurrency';
import { ERCToken } from './token';

export type Currency = NativeCurrency | ERCToken | ELFChainToken;
