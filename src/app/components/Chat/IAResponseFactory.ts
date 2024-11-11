import { IAResponseCategoryEnum } from "../../../domain/enums/IAResponseCategoryEnum";

export enum IAResponseSourceEnum {
  local = "local",
  database = "database",
}

export class BaseIAResponse {
  category: IAResponseCategoryEnum = IAResponseCategoryEnum.loading;
  source: IAResponseSourceEnum;
  constructor(source: IAResponseSourceEnum = IAResponseSourceEnum.local) {
    this.source = source;
  }
}

export interface venue {
  name: string;
  description: string;
  capacity: string;
}

export class VenueSuggestion extends BaseIAResponse {
  category = IAResponseCategoryEnum.venue_suggestion;
  intro: string;
  venues: venue[];

  constructor(intro: string, venues: venue[], source: IAResponseSourceEnum) {
    super(source);
    this.intro = intro;
    this.venues = venues;
  }
}

export class QueryHandling extends BaseIAResponse {
  category = IAResponseCategoryEnum.query_handling;
  intro: string;
  tips: string[];

  constructor(intro: string, tips: string[], source: IAResponseSourceEnum) {
    super(source);
    this.intro = intro;
    this.tips = tips;
  }
}

export interface item {
  type: string;
  examples: string;
}

export class LogisticalQuery extends BaseIAResponse {
  category = IAResponseCategoryEnum.logistical_query;
  intro: string;
  items: item[];

  constructor(intro: string, items: item[], source: IAResponseSourceEnum) {
    super(source);
    this.intro = intro;
    this.items = items;
  }
}

export class NoneCategory extends BaseIAResponse {
  category = IAResponseCategoryEnum.none;
  constructor(source: IAResponseSourceEnum = IAResponseSourceEnum.local) {
    super(source);
  }
}
export class ErrorCategory extends BaseIAResponse {
  category = IAResponseCategoryEnum.error;
  constructor() {
    super(IAResponseSourceEnum.local);
  }
}

export function IAResponseFactory(
  jsonStr: string | null,
  source: IAResponseSourceEnum
): BaseIAResponse {
  if (jsonStr === null) return new ErrorCategory();
  try {
    let json = JSON.parse(jsonStr);
    switch (json.category) {
      case IAResponseCategoryEnum.venue_suggestion:
        return new VenueSuggestion(
          json.content.intro,
          json.content.venues,
          source
        );
      case IAResponseCategoryEnum.query_handling:
        return new QueryHandling(json.content.intro, json.content.tips, source);
      case IAResponseCategoryEnum.logistical_query:
        return new LogisticalQuery(
          json.content.intro,
          json.content.items,
          source
        );
      default:
        return new NoneCategory(source);
    }
  } catch {
    return new ErrorCategory();
  }
}
