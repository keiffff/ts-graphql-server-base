// This file was generated by graphql-codegen. DO NOTT EDIT MANUALLY.
// biome-ignore lint: This file was generated by graphql-codegen.
import type * as Types from "../../common/types/graphql.ts";
export namespace OrganizationModule {
  interface DefinedFields {
    Query: 'organization';
    Organization: 'id' | 'name' | 'accounts';
  };
  
  export type Query = Pick<Types.GqlQuery, DefinedFields['Query']>;
  export type Organization = Pick<Types.GqlOrganization, DefinedFields['Organization']>;
  export type UUID = Types.GqlUuid;
  export type Account = Types.GqlAccount;
  
  export type QueryResolvers = Required<Pick<Types.GqlQueryResolvers, DefinedFields['Query']>>;
  export type OrganizationResolvers = Pick<Types.GqlOrganizationResolvers, DefinedFields['Organization'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query: QueryResolvers;
    Organization?: OrganizationResolvers;
  };
}