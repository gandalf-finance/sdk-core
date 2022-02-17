import { validateAndParseAddress } from '../utils/validateAndParseAddress'
import { BaseCurrency } from './baseCurrency'
import { Currency } from './currency'
import invariant from 'tiny-invariant'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class ERCToken extends BaseCurrency {
  public readonly isNative: false = false
  public readonly isToken: true = true
  public readonly isELFChain: false = false

  /**
   * The contract address on the chain on which this token lives
   */
  public readonly address: string

  public constructor(chainId: number | string, address: string, decimals: number, symbol: string = 'ERCToken', name?: string) {
    super(chainId, decimals, symbol, name)
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return other.chainId === this.chainId && typeof other.chainId === 'string'
      ? other.symbol.toLowerCase() === this.symbol.toLowerCase()
      : other.isToken && other.address.toLowerCase() === this.address.toLowerCase()
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: ERCToken): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): ERCToken {
    return this
  }
}
