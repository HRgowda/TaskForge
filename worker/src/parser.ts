// function to extract the string value present inside the placeHolder.

export function parse(text: string, value: any, startDelimeter = "{", endDelimeter = "}") {
  console.log(`Parsing text: ${text}`);
  
  let startIndex = 0
  let endIndex = 1

  let finalString = ""

  while (endIndex < text.length) {
    
    // logic to process if we got the startDelimeter. Find the endDelimeter.
    if (text[startIndex] === startDelimeter) {
      let endPoint = startIndex + 2; // +2 because to skip 1 iteration .
      while (text[endPoint] !== endDelimeter) {
        endPoint++;
      }

      // Extract the placeholder, e.g. {comment.amount}
      let stringHoldingValue = text.slice(startIndex + 1, endPoint);

      // Split the placeholder into keys (e.g. ["comment", "amount"])
      let keys = stringHoldingValue.split(".");

      // we are storing it in localValues because we dont need to modify the original value.
      let localValues = { ...value };

      for (let i = 0; i < keys.length; i++) {
        if (typeof localValues === "string") {
          localValues = JSON.parse(localValues);
        }
        localValues = localValues[keys[i]];
      }

      finalString += localValues;
      startIndex = endPoint + 1;
      endIndex = endPoint + 2;
    } else {
      finalString += text[startIndex];
      startIndex++;
      endIndex++;
    }
  }

  // Edge case for last string in the text
  if (text[startIndex]) {
    finalString += text[startIndex];
  }

  return finalString;
}

// Example input
// let value = parse("{comment.amount}", 
//   {
//   comment: {
//     address: "hg510443@gmail.com",
//     amount: "2"
//   }
// })

// console.log(value)