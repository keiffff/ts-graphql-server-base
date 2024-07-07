import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Account {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  name: string;
  updatedAt: Generated<Timestamp>;
}

export interface AccountOrganization {
  accountId: string;
  createdAt: Generated<Timestamp>;
  organizationId: string;
  updatedAt: Generated<Timestamp>;
}

export interface Organization {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  name: string;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  account: Account;
  accountOrganization: AccountOrganization;
  organization: Organization;
}
