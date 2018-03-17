module.exports = [
  {
    name: 'Gear',
    sets: [
      {
        name: 'Exotics',
        big: true,
        query: 'is:exotic is:gear'
      },
      {
        name: 'Weapons',
        big: true,
        sections: [
          {
            name: 'Kinetic',
            query: 'is:legendary is:weapon is:kinetic'
          },
          {
            name: 'Energy',
            query: 'is:legendary is:weapon is:energy'
          },
          {
            name: 'Power',
            query: 'is:legendary is:weapon is:power'
          },
          {
            name: 'Ghosts',
            query: 'is:legendary is:ghost'
          }
        ]
      },
      {
        name: 'Armor',
        big: true,
        query: 'is:legendary is:armor'
      }
    ]
  },

  {
    name: 'Cosmetics',
    sets: [
      {
        name: 'Emblems',
        big: true,
        sections: [
          {
            name: 'Legendary',
            query: 'is:legendary is:emblem'
          },
          {
            name: 'Rare',
            query: 'is:rare is:emblem'
          },
          {
            name: 'Uncommon',
            query: 'is:uncommon is:emblem'
          },
          {
            name: 'Common',
            query: 'is:common is:emblem'
          }
        ]
      },

      {
        name: 'Shaders',
        big: true,
        sections: [
          {
            name: 'Legendary',
            query: 'is:legendary is:shader'
          },
          {
            name: 'Rare',
            query: 'is:rare is:shader'
          },
          {
            name: 'Uncommon',
            query: 'is:uncommon is:shader'
          }
        ]
      },

      {
        name: 'Emotes',
        big: true,
        query: 'is:emote'
      },

      {
        name: 'Ornaments',
        big: true,
        query: 'is:ornament'
      }
    ]
  },

  {
    name: 'Vehicles',
    sets: [
      {
        name: 'Sparrows',
        query: 'is:sparrow'
      },

      {
        name: 'Ships',
        query: 'is:ship'
      }
    ]
  }
];
