export type UnitSet = 'T1' | 'T2' | 'T3' | 'air' | 'scout'
                     | 'UEF' | 'Cybran' | 'Aeon' | 'Seraphim';

export interface Unit {
  id: string;
  name?: string;
  memberships: Set<UnitSet>;
}

const units: Record<string, Unit> = {
  UEA0101: {
    id: 'UEA0101',
    name: 'Hummingbird',
    memberships: new Set<UnitSet>(['T1', 'air', 'scout', 'UEF'])
  },
  URA0101: {
    id: 'URA0101',
    memberships: new Set<UnitSet>(['T1', 'air', 'scout', 'Cybran'])
  },
  UAA0101: {
    id: 'UAA0101',
    memberships: new Set<UnitSet>(['T1', 'air', 'scout', 'Aeon'])
  },
  XSA0101: {
    id: 'XSA0101',
    memberships: new Set<UnitSet>(['T1', 'air', 'scout', 'Seraphim'])
  },
};

// returns an array of unit IDs
export const query = (memberships: UnitSet[]): string[] => (
  Object.values(units).filter(u => memberships.every(p => u.memberships.has(p))).map(u => u.id)
);
