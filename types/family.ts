export interface VillageInfo {
  gam: string;
  sakh: string;
  extra: string;
}

export interface Child {
  name: string;
  children?: Child[];
  village?: string;
}

export interface FamilyMember {
  name: string;
  father: string;
  mother: string;
  wife: string;
  sons: Child[];
  daughters: Child[];
  mosal: VillageInfo;
  sasru: VillageInfo;
}

export interface SearchResult {
  member: FamilyMember;
  matchType: 'name' | 'village' | 'relation';
  matchText: string;
}

export interface Relationship {
  person1: string;
  person2: string;
  relationship: string;
  path: string[];
}

export interface FamilyTreeNode {
  name: string;
  children: FamilyTreeNode[];
  isExpanded: boolean;
  level: number;
  member?: FamilyMember;
  village?: string;
}
