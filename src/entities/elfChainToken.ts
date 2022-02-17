import { BaseCurrency } from './baseCurrency'
import { Currency } from './currency'
import { ERCToken } from './token'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class ELFChainToken extends BaseCurrency {
  public readonly isNative: false = false
  public readonly isToken: false = false
  public readonly isELFChain: true = true

  /**
   * The contract address on the chain on which this token lives
   */
  public readonly address: string

  public constructor(chainId: string, address: string, decimals: number, symbol: string, name?: string) {
    super(chainId, decimals, symbol, name)
    this.address = address || symbol
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return (other.isELFChain || other.isToken) && this.chainId === other.chainId && this.symbol === other.symbol
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: ELFChainToken): boolean {
    return this.symbol.toLowerCase() < other.symbol.toLowerCase()
  }
  public get wrapped(): ERCToken {
    throw new Error('Method not implemented.')
  }
}
