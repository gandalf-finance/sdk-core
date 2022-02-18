import { Currency, ERCToken } from '.';
import { BaseCurrency } from './baseCurrency';
import { Tags, TokenInfo, TokenList } from '@awaken/token-lists';
declare type TagDetails = Tags[keyof Tags];
interface TagInfo extends TagDetails {
    id: string;
}
/**
 * Token instances created from token info on a token list.
 */
export declare class WrappedTokenInfo implements BaseCurrency {
    readonly isNative: false;
    isToken: boolean;
    isELFChain: boolean;
    readonly list: TokenList;
    readonly tokenInfo: TokenInfo;
    constructor(tokenInfo: TokenInfo, list: TokenList);
    get wrapped(): ERCToken;
    _checksummedAddress: string | null;
    get address(): string;
    get chainId(): number | string;
    get decimals(): number;
    get name(): string;
    get symbol(): string;
    get logoURI(): string | undefined;
    private _tags;
    get tags(): TagInfo[];
    equals(other: Currency): boolean;
    sortsBefore(other: ERCToken): boolean;
}
export {};
