import type * as Types from "../../common/types/graphql.ts";
export namespace AccountModule {
  interface DefinedFields {
    Query: 'account';
    Account: 'id' | 'name' | 'organizations';
  };
  
  export type Query = Pick<Types.GqlQuery, DefinedFields['Query']>;
  export type Account = Pick<Types.GqlAccount, DefinedFields['Account']>;
  export type Organization = Types.GqlOrganization;
  
  export type QueryResolvers = Required<Pick<Types.GqlQueryResolvers, DefinedFields['Query']>>;
  export type AccountResolvers = Pick<Types.GqlAccountResolvers, DefinedFields['Account'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query: QueryResolvers;
    Account?: AccountResolvers;
  };
}