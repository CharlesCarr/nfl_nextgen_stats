export const formatInput = (input: string) => {
  // 'charlie Carr' or 'CHARLIE carr'
  const allLower = input.toLowerCase();
  const nameArr = allLower.split(" ");
  const test = nameArr.map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  const formattedInput = `${test[0]} ${test[1]}`;
  return formattedInput;
};
