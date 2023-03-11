import { query, UnitSet } from "./units";
import { readFile, writeFile } from "fs/promises"
import { FA_REPO_PATH } from "./config";

const buildNestedPropRegex = (nestedProp: string[]): string => {
  if (nestedProp.length == 0) { console.log('unexpected'); return ')(.*?)(' }
  const prop = nestedProp[0];
  if (nestedProp.length == 1) {
    return `${prop} = )(.*?)(`
  }
  return `${prop} = {.*?${buildNestedPropRegex(nestedProp.slice(1))},.*?}`;
};

const modifyProp = async (unitId: string, prop: string, f: (...args: string[]) => string) => {
  const path = FA_REPO_PATH+`/units/${unitId}/${unitId}_unit.bp`;
  const data = await readFile(path, { encoding: 'utf8' });
  const nestedProp = prop.split('.');
  const re = new RegExp(`(${buildNestedPropRegex(nestedProp)})`, 's')
  await writeFile(path, data.replace(re,f));
};

export const modify = async (memberships: UnitSet[], prop: string, f: (...args: string[]) => string) => {
  const ids = query(memberships);
  for (let id of ids) {
    await modifyProp(id, prop, f);
  }
};

export const arithmeticModifier = (f: (a: number) => number) => (...args: string[]) => (`${args[1]}${f(parseInt(args[2]))}${args[3]}`);
