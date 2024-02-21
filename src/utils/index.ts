import { UniqueIdentifier } from "@dnd-kit/core";
import { Id } from "../types";

export const generateId = () => Math.floor(Math.random() * 10001);

export const getPosition = <T extends { id: Id }>(
  arr: T[],
  id?: UniqueIdentifier
) => {
  return !id ? -1 : arr.findIndex((item) => item.id === id);
};
