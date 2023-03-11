# faf-edit
Requirements: `node` (and the local copy of the [fa repository](https://github.com/FAForever/fa) that you want to edit)

Install:
```
npm install
```

Usage:
1. Set FA repository path in `config.ts`
2. Add any missing units to 'units.ts' eg.
```
// UEF interceptor
{
  id: 'UEA0102',
  memberships: new Set<UnitSet>(['T1', 'air', 'interceptor', 'UEF'])
},
```
3. Add some modifiers to `main.ts` eg.
```
// 1st param: Modify all units of classes 'T1'∩'scout'
// 2nd param: Modify the Physics.Elevation property
// 3rd param: Property value is replaced by the output of this function
await modify(['T1', 'scout'], 'Physics.Elevation', arithmeticModifier(a => 12));
```
4. `npm start` to apply the modifications
