import { Currency, ERCToken } from '.';
import { BaseCurrency } from './baseCurrency';
import { Tags, TokenInfo, TokenList } from '@awaken/token-lists';
import { isAddress } from '../utils';

type TagDetails = Tags[keyof Tags];
interface TagInfo extends TagDetails {
  id: string;
}
/**
 * Token instances created from token info on a token list.
 */
export class WrappedTokenInfo implements BaseCurrency {
  public readonly isNative: false = false;
  public isToken: boolean;
  public isELFChain: boolean;

  public readonly list: TokenList;

  public readonly tokenInfo: TokenInfo;

  constructor(tokenInfo: TokenInfo, list: TokenList) {
    this.tokenInfo = tokenInfo;
    this.list = list;
    this.isELFChain = typeof tokenInfo.chainId === 'string';
    this.isToken = !this.isELFChain;
  }
  get wrapped(): ERCToken {
    throw new Error('Method not implemented.');
  }

  public _checksummedAddress: string | null = null;

  public get address(): string {
    if (this._checksummedAddress) return this._checksummedAddress;
    if (typeof this.tokenInfo.chainId === 'number') {
      const checksummedAddress = isAddress(this.tokenInfo.address);
      if (!checksummedAddress) throw new Error(`Invalid token address: ${this.tokenInfo.address}`);
      return (this._checksummedAddress = checksummedAddress);
    }
    return (this._checksummedAddress = this.tokenInfo.symbol);
  }

  public get chainId(): number | string {
    return this.tokenInfo.chainId;
  }

  public get decimals(): number {
    return this.tokenInfo.decimals;
  }

  public get name(): string {
    return this.tokenInfo.name;
  }

  public get symbol(): string {
    return this.tokenInfo.symbol;
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI;
  }

  private _tags: TagInfo[] | null = null;
  public get tags(): TagInfo[] {
    if (this._tags !== null) return this._tags;
    if (!this.tokenInfo.tags) return (this._tags = []);
    const listTags = this.list.tags;
    if (!listTags) return (this._tags = []);

    return (this._tags = this.tokenInfo.tags.map((tagId) => {
      return {
        ...listTags[tagId],
        id: tagId,
      };
    }));
  }

  equals(other: Currency): boolean {
    return (
      other.chainId === this.chainId &&
      (typeof other.chainId === 'string'
        ? other.symbol.toLowerCase() === this.symbol.toLowerCase()
        : other.isToken && other.address.toLowerCase() === this.address.toLowerCase())
    );
  }

  sortsBefore(other: ERCToken): boolean {
    if (this.equals(other)) throw new Error('Addresses should not be equal');
    return typeof other.chainId === 'string'
      ? this.symbol.toLowerCase() < other.symbol.toLowerCase()
      : this.address.toLowerCase() < other.address.toLowerCase();
  }
}
