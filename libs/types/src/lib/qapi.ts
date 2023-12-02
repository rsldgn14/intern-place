import { ParsedUrlQuery } from 'querystring';

export interface QApi {
  sort?: string[];
  fields?: string[];
  filter?: string[];
  q?: string;
  limit?: number;
  offset?: number;
  totalCount?: number;
  preloads?: string[];
}

export function toQueryParam(api?: QApi): string {
  if (!api) {
    return '';
  }
  const parts: string[] = [];

  if (api.limit) {
    parts.push(`_limit=${api.limit}`);
  }
  if (api.offset) {
    parts.push(`_offset=${api.offset}`);
  }

  if (api.sort && api.sort.length > 0) {
    parts.push(`_sort=${api.sort.join(',')}`);
  }
  if (api.filter && api.filter.length > 0) {
    parts.push(`_filter=${api.filter.join(',')}`);
  }
  if (api.fields && api.fields.length > 0) {
    parts.push(`_fields=${api.fields.join(',')}`);
  }
  if (api.preloads && api.preloads.length > 0) {
    parts.push(`_preloads=${api.preloads.join(',')}`);
  }
  if (api.q && api.q.length > 0) {
    parts.push(`_q=${api.q}`);
  }
  if (parts.length > 0) {
    return `?${parts.join('&')}`;
  }
  return '';
}

export function fromQueryParam(query: string): QApi {
  const api: QApi = {};
  const params = new URLSearchParams(query);
  if (params.has('_limit')) {
    api.limit = Number(params.get('_limit'));
  }
  if (params.has('_offset')) {
    api.offset = Number(params.get('_offset'));
  }
  if (params.has('_sort')) {
    api.sort = params.get('_sort')?.split(',');
  }
  if (params.has('_filter')) {
    api.filter = params.get('_filter')?.split(',');
  }
  if (params.has('_fields')) {
    api.fields = params.get('_fields')?.split(',');
  }
  if (params.has('_preloads')) {
    api.preloads = params.get('_preloads')?.split(',');
  }
  if (params.has('_q')) {
    api.q = params.get('_q') ?? undefined;
  }
  return api;
}

export function fromParsedUrlQuery(query: ParsedUrlQuery): QApi | undefined {
  const api: QApi = {};
  // if nothing hits return undefined
  if (!query) {
    return undefined;
  }
  const hit = Object.keys(query).find((key) => key.startsWith('_'));
  if (!hit) {
    return undefined;
  }
  if (query['_limit']) {
    api.limit = Number(query['_limit']);
  }
  if (query['_offset']) {
    api.offset = Number(query['_offset']);
  }
  if (query['_sort']) {
    api.sort = query['_sort']?.toString().split(',');
  }
  if (query['_filter']) {
    api.filter = query['_filter']?.toString().split(',');
  }
  if (query['_fields']) {
    api.fields = query['_fields']?.toString().split(',');
  }
  if (query['_preloads']) {
    api.preloads = query['_preloads']?.toString().split(',');
  }
  if (query['_q']) {
    api.q = query['_q']?.toString();
  }
  return api;
}

export enum FilterOperation {
  Unknown,
  EQ,
  NEQ,
  LT,
  LTE,
  GT,
  GTE,
  LK,
  IN,
  IN_ALT,
}

export class Filter {
  Name: string;
  Operation: FilterOperation;
  Value: string;

  constructor(name: string, operation?: FilterOperation, value?: string) {
    if (name && operation && value) {
      this.Name = name;
      this.Operation = operation;
      this.Value = value;
    } else {
      this.Name = name;
      this.Operation = FilterOperation.Unknown;
      this.Value = '';
      this.parse(name);
    }
  }

  parse(param: string): Error | undefined {
    param = param.trim();
    if (param.length < 3) {
      return new Error('ErrParamLength');
    }

    let op = '';
    let outerBreak = false;
    for (let i = 0; i < param.length; i++) {
      const ch = param.charAt(i);
      switch (ch) {
        case '=':
        case '!':
        case '<':
        case '>':
        case '~':
        case '|':
        case '*':
          op += ch;
          if (op.length === 2) {
            outerBreak = true;
            break;
          }
          break;
        default:
          if (op.length === 1) {
            outerBreak = true;
            break;
          }
      }
      if (outerBreak) {
        break;
      }
    }
    switch (op) {
      case '=':
        this.Operation = FilterOperation.EQ;
        break;
      case '!=':
        this.Operation = FilterOperation.NEQ;
        break;
      case '<':
        this.Operation = FilterOperation.LT;
        break;
      case '<=':
        this.Operation = FilterOperation.LTE;
        break;
      case '>':
        this.Operation = FilterOperation.GT;
        break;
      case '>=':
        this.Operation = FilterOperation.GTE;
        break;
      case '~=':
        this.Operation = FilterOperation.LK;
        break;
      case '|=':
        this.Operation = FilterOperation.IN;
        break;
      case '*=':
        this.Operation = FilterOperation.IN_ALT;
        break;
      default:
        return new Error('ErrInvalidOp');
    }

    const nameValue = param.split(op);
    this.Name = nameValue[0].trim();
    this.Value = nameValue[1].trim();
    if (this.Name.length === 0 || this.Value.length === 0) {
      return new Error('ErrMissingNameValue');
    }
    return undefined;
  }
}