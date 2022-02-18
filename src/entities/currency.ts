import { ELFChainToken } from './elfChainToken'
import { NativeCurrency } from './nativeCurrency'
import { ERCToken } from './token'
import { WrappedTokenInfo } from './wrappedTokenInfo'

export type Currency = NativeCurrency | ERCToken | ELFChainToken | WrappedTokenInfo
