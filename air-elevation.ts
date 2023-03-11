import { arithmeticModifier, modify } from "./blueprint";

export const applyChanges = async () => {
  await modify(['T1', 'scout'], 'Physics.Elevation', arithmeticModifier(a => 12));
};
