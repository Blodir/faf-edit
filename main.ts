import { query, UnitSet } from "./units";
import { readFile, writeFile } from "fs/promises"

const FA_REPO_PATH = '../fa'

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

const modify = (memberships: UnitSet[], prop: string, f: (...args: string[]) => string) => {
  const ids = query(memberships);
  ids.forEach(id => {
    modifyProp(id, prop, f);
  });
};

const arithmeticModifier = (f: (a: number) => number) => (...args: string[]) => (`${args[1]}${f(parseInt(args[2]))}${args[3]}`);

const main = async () => {
  await modify(['T1', 'scout'], 'Air.BankFactor', arithmeticModifier(a => 4));
};

main();
