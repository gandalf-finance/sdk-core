import { BaseCurrency } from './baseCurrency';
import { Currency } from './currency';
import { ERCToken } from './token';
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export declare class ELFChainToken extends BaseCurrency {
    readonly isNative: false;
    readonly isToken: false;
    readonly isELFChain: true;
    /**
     * The contract address on the chain on which this token lives
     */
    readonly address: string;
    constructor(chainId: string, address: string, decimals: number, symbol: string, name?: string);
    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    equals(other: Currency): boolean;
    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other other token to compare
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    sortsBefore(other: ELFChainToken): boolean;
    get wrapped(): ERCToken;
}
