export type Mapping<V extends string | number> = Record<string, V>;

export type LookupTable<
  T extends string | number,
  V extends string | number = 1,
> = Record<T, Mapping<V>>;

export type LookupTables = {
  // TODO: add alternative_art investigators.
  relations: {
    // `Hallowed Mirror` has bound `Soothing Melody`.
    bound: LookupTable<string, 1>;
    // `Soothing Melody` is bonded to `Hallowed Mirror`.
    bonded: LookupTable<string, 1>;
    // `Daisy's Tote Bag` is restrictory to `Daisy Walker`.
    restrictedTo: LookupTable<string, 1>;
    // `Daisy Walker`'s requires `Daisy's Tote Bag`.
    requiredCards: LookupTable<string, 1>;
    // Roland bannks has parallel card "Directive".
    parallelCards: LookupTable<string, 1>;
    // Parallel versions of an investigator.
    parallel: LookupTable<string, 1>;
    // Advanced requiredCards for an investigator.
    advanced: LookupTable<string, 1>;
    // Replacement requiredCards for an investigator.
    replacement: LookupTable<string, 1>;
    // Any card can have `n` different level version. (e.g. Ancient Stone)
    level: LookupTable<string, 1>;
    // Revised core "First Aid (3)"is a duplicate of Pallid Mask "First Aid (3)".
    duplicates: LookupTable<string, 1>;
  };
  typesByCardTypeSelection: LookupTable<string, 1>;
  traitsByCardTypeSeletion: LookupTable<string, 1>;
  packsByCycle: LookupTable<string, 1>;
  encounterCode: LookupTable<string>;
  typeCode: LookupTable<string>;
  subtypeCode: LookupTable<string>;
  actions: LookupTable<string>;
  cost: LookupTable<number>;
  factionCode: LookupTable<string>;
  packCode: LookupTable<string>;
  health: LookupTable<number>;
  sanity: LookupTable<number>;
  properties: {
    healsDamage: Mapping<1>;
    healsHorror: Mapping<1>;
    fast: Mapping<1>;
    multislot: Mapping<1>;
    seal: Mapping<1>; // TODO: link the tokens?
    succeedBy: Mapping<1>;
  };
  skillBoosts: LookupTable<string>;
  // cards that occupy multiple slots are added to both slot entries and a separate grouped entry. They are also added to the `properties.multislot` index.
  slots: LookupTable<string>;
  // Sort indexes help keep sorting operations fast by reducing time complexity of sorts to `O(n)`.
  sort: {
    alphabetical: Mapping<number>;
  };
  // used: filtering.
  traits: LookupTable<string>;
  uses: LookupTable<string>;
  // used: filtering.
  level: LookupTable<number>;
  // used: filtering.
  tabooSet: LookupTable<number>;
};

export type LookupTablesSlice = {
  lookupTables: LookupTables;

  refreshLookupTables(partial?: unknown): void;
};
