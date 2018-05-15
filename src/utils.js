export default function findHighestNumber(arr) {
  const filesArr = arr.length > 1 ? true : arr[0] || 0;
  // Reordering the items to get the highest number - can't surely know that the last in the array is the highest.
  const heighestNumberInString =
    filesArr &&
    arr
      .map(fileName => fileName.match(/\d+/g))
      .sort((a, b) => a - b)
      .reverse()[0];
  return (heighestNumberInString && parseInt(heighestNumberInString, 10)) || 0;
}
