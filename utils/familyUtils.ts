import familyData from "../data/family.json";
import {
  FamilyMember,
  FamilyTreeNode,
  Relationship,
  SearchResult,
} from "../types/family";

// Convert JSON data to typed array
export const familyMembers: FamilyMember[] = familyData as FamilyMember[];

// Search family members by name, village, or relation
export const searchFamilyMembers = (query: string): SearchResult[] => {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const searchQuery = query.toLowerCase();

  familyMembers.forEach((member) => {
    // Search by name
    if (member.name.toLowerCase().includes(searchQuery)) {
      results.push({
        member,
        matchType: "name",
        matchText: member.name,
      });
    }

    // Search by father's name
    if (member.father.toLowerCase().includes(searchQuery)) {
      results.push({
        member,
        matchType: "relation",
        matchText: `Father: ${member.father}`,
      });
    }

    // Search by mother's name
    if (member.mother.toLowerCase().includes(searchQuery)) {
      results.push({
        member,
        matchType: "relation",
        matchText: `Mother: ${member.mother}`,
      });
    }

    // Search by wife's name
    if (member.wife && member.wife.toLowerCase().includes(searchQuery)) {
      results.push({
        member,
        matchType: "relation",
        matchText: `Wife: ${member.wife}`,
      });
    }

    // Search by village (mosal)
    if (member.mosal.gam.toLowerCase().includes(searchQuery)) {
      results.push({
        member,
        matchType: "village",
        matchText: `Mosal: ${member.mosal.gam}`,
      });
    }

    // Search by village (sasru)
    if (member.sasru.gam.toLowerCase().includes(searchQuery)) {
      results.push({
        member,
        matchType: "village",
        matchText: `Sasru: ${member.sasru.gam}`,
      });
    }

    // Search in children
    [...member.sons, ...member.daughters].forEach((child) => {
      if (child.name.toLowerCase().includes(searchQuery)) {
        results.push({
          member,
          matchType: "relation",
          matchText: `Child: ${child.name}`,
        });
      }
    });
  });

  return results;
};

// Build family tree structure
export const buildFamilyTree = (): FamilyTreeNode[] => {
  const tree: FamilyTreeNode[] = [];
  const processed = new Set<string>();

  // Find root members (those who don't have parents in the data)
  const rootMembers = familyMembers.filter(
    (member) =>
      !familyMembers.some(
        (m) =>
          m.sons.some((s) => s.name === member.name) ||
          m.daughters.some((d) => d.name === member.name)
      )
  );

  rootMembers.forEach((member) => {
    if (!processed.has(member.name)) {
      tree.push(buildTreeNode(member, 0, processed));
    }
  });

  return tree;
};

const buildTreeNode = (
  member: FamilyMember,
  level: number,
  processed: Set<string>
): FamilyTreeNode => {
  processed.add(member.name);

  const children: FamilyTreeNode[] = [];

  // Add sons
  member.sons.forEach((son) => {
    const sonMember = familyMembers.find((m) => m.name === son.name);
    if (sonMember && !processed.has(son.name)) {
      children.push(buildTreeNode(sonMember, level + 1, processed));
    } else {
      children.push({
        name: son.name,
        children: [],
        isExpanded: false,
        level: level + 1,
      });
    }
  });

  // Add daughters
  member.daughters.forEach((daughter) => {
    const daughterMember = familyMembers.find((m) => m.name === daughter.name);
    if (daughterMember && !processed.has(daughter.name)) {
      children.push(buildTreeNode(daughterMember, level + 1, processed));
    } else {
      children.push({
        name: daughter.name,
        children: [],
        isExpanded: false,
        level: level + 1,
        village: daughter.village,
      });
    }
  });

  return {
    name: member.name,
    children,
    isExpanded: false,
    level,
    member,
  };
};

// Find relationship between two people
export const findRelationship = (
  person1: string,
  person2: string
): Relationship | null => {
  const member1 = familyMembers.find((m) => m.name === person1);
  const member2 = familyMembers.find((m) => m.name === person2);

  if (!member1 || !member2) return null;

  // Simple relationship finder - can be enhanced
  if (member1.father === member2.name) {
    return {
      person1,
      person2,
      relationship: `${person2} is ${person1}'s father`,
      path: [person2, person1],
    };
  }

  if (member1.mother === member2.name) {
    return {
      person1,
      person2,
      relationship: `${person2} is ${person1}'s mother`,
      path: [person2, person1],
    };
  }

  if (member1.wife === member2.name) {
    return {
      person1,
      person2,
      relationship: `${person2} is ${person1}'s wife`,
      path: [person1, person2],
    };
  }

  // Check if person2 is a child of person1
  const isChild = [...member1.sons, ...member1.daughters].some(
    (child) => child.name === person2
  );
  if (isChild) {
    const gender = member1.sons.some((s) => s.name === person2)
      ? "son"
      : "daughter";
    return {
      person1,
      person2,
      relationship: `${person2} is ${person1}'s ${gender}`,
      path: [person1, person2],
    };
  }

  return {
    person1,
    person2,
    relationship: "Relationship not found",
    path: [],
  };
};


export const getAllVillages = (): string[] => {
  const villages = new Set<string>();

  familyMembers.forEach((member) => {
    if (member.mosal.gam) villages.add(member.mosal.gam);
    if (member.sasru.gam) villages.add(member.sasru.gam);
    member.daughters.forEach((daughter) => {
      if (daughter.village) villages.add(daughter.village);
    });
  });

  return Array.from(villages).sort();
};
