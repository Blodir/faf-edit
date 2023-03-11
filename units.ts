export type UnitSet = 'T1' | 'T2' | 'T3' | 'air'
                     | 'scout' | 'interceptor'
                     | 'UEF' | 'Cybran' | 'Aeon' | 'Seraphim';

export interface Unit {
  id: string;
  name?: string;
  memberships: Set<UnitSet>;
}

const units: Unit[] = [
  {
    id: 'UEA0101',
    name: 'Hummingbird',
    memberships: new Set<UnitSet>(['T1', 'air', 'scout', 'UEF'])
  },
  {
    id: 'URA0101',
    memberships: new Set<UnitSet>(['T1', 'air', 'scout', 'Cybran'])
  },
  {
    id: 'UAA0101',
    memberships: new Set<UnitSet>(['T1', 'air', 'scout', 'Aeon'])
  },
  {
    id: 'XSA0101',
    memberships: new Set<UnitSet>(['T1', 'air', 'scout', 'Seraphim'])
  },
  {
    id: 'UEA0102',
    memberships: new Set<UnitSet>(['T1', 'air', 'interceptor', 'UEF'])
  },
  {
    id: 'URA0102',
    memberships: new Set<UnitSet>(['T1', 'air', 'interceptor', 'Cybran'])
  },
  {
    id: 'UAA0102',
    memberships: new Set<UnitSet>(['T1', 'air', 'interceptor', 'Aeon'])
  },
  {
    id: 'XSA0102',
    memberships: new Set<UnitSet>(['T1', 'air', 'interceptor', 'Seraphim'])
  },
];

// returns an array of unit IDs
export const query = (memberships: UnitSet[]): string[] => (
  units.filter(u => memberships.every(p => u.memberships.has(p))).map(u => u.id)
);
