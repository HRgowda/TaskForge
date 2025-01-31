// function to extract the string value present inside the placeHolder.

export function parse(text: string, value: any, startDelimeter = "{", endDelimeter = "}") {

  let startIndex = 0
  let endIndex = 1

  let finalString = ""

  while(endIndex < text.length) {
    // logic to process if we got the startDelimeter. Find the endDelimeter.
    if (text[startIndex] === startDelimeter){
      let endPoint = startIndex + 2 // +2 because to skip 1 iteration .
      while(text[endPoint] !== endDelimeter){
        endPoint ++
      }
      // extract the values present in the placeholder i.e {comment.amount} for example in this case.
      let stringHoldingValue = text.slice(startIndex + 1, endPoint);

      // split it into an array of the stringValue
      let keys = stringHoldingValue.split(".");
      
      // we are soring it in localValues because we dont need to modify the original value.
      let localValues = {
        ...value
      }


      for(let i = 0; i < keys.length; i++){
        if (typeof localValues === "string"){
          localValues = JSON.parse(localValues)
        }
        localValues = localValues[keys[i]]
      }

      finalString += localValues;
      startIndex = endPoint + 1;
      endIndex = endPoint + 2

    } else {
      finalString += text[startIndex]
      startIndex ++ 
      endIndex ++
    }
  }

  // Edge case for last string in the text
  if(text[startIndex]) {
    finalString += text[startIndex]
  }
  return finalString;
}

// let value = parse("You received {comment.amount} money from {comment.address}", 
//   {
//   comment: {
//     amount: "100",
//     address: "abcdefg"
//   }
// })

// console.log(value)