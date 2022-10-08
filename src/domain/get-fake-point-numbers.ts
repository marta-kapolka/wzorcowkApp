export function getFakePointNumbers(mainPointNumber: number, pointsGroups: number[][]): number[] {
  const mainPointGroup = pointsGroups.find(pointGroup => pointGroup.includes(mainPointNumber)) || [];
  const fakePoints = mainPointGroup?.filter(point => point !== mainPointNumber);
  return fakePoints;
}