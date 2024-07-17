import DataLoader from "dataloader"
import { findAccountsByIds } from "./model/findAccountsByIds/index.js"
import type { Account } from "./model/index.js"

export const createAccountDataLoader = () =>
  new DataLoader<string, Account | null>(
    async (ids) => await findAccountsByIds(ids),
  )
