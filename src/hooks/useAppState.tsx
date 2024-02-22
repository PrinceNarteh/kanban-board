import { useAppStore } from "../store";

export const useAppState = () => useAppStore((state) => state);
