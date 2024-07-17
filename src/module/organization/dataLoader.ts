import DataLoader from "dataloader"
import { findOrganizationsByIds } from "../account/model/findOrganizationsByIds/index.js"
import type { Organization } from "./model/index.js"

export const createOrganizationDataLoader = () =>
  new DataLoader<string, Organization | null>(
    async (ids) => await findOrganizationsByIds(ids),
  )
