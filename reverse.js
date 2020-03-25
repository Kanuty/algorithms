function reverse(str){
  let result = "";

  function helper(inp){
    if(inp.length === 0)return;
    result = `${inp[0]}${result}`;
    return helper(inp.slice(1));
    }

  helper(str);
  return result;
}

  console.log(reverse("unia europejska"))

