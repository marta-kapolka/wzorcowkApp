export function getPointGroupsFromText(text: string): number[][] {
  const groups = text.split(";")
    .map(group => group.trim())
      .map(group => group.split(",")
      .map(group => Number(group.trim()))
      .filter(item => item !== 0)
    );
      
  return groups;
}