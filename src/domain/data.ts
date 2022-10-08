export let POINTS_GROUPS: number[][] = [
  [31, 32, 37],
  [37, 38, 39],
  [35, 36, 56],
  [40],
  [41, 43],
  [42],
  [44, 45, 46],
  [47, 48, 49, 50, 51, 52],
  [54],
  [58],
  [59, 60],
  [62, 63, 64, 65],
  [66, 68, 69],
  [76],
  [70],
  [71, 73, 74, 75],
  [83, 85, 86, 87],
  [81],
  [82],
  [77, 78, 79],
  [101, 102, 103],
  [98, 99],
  [92, 94, 95, 96, 97],
  [105, 106],
  [107, 108],
  [109, 110, 111],
  [33],
]

const fakePointsAmounts = POINTS_GROUPS.map(group => group.length - 1);

export const FAKE_POINTS_FIELDS_AMOUNT = Math.max(...fakePointsAmounts) + 1;