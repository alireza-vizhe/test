const shorten = (title) => {
    console.log(title);
  const titlesci = title.split(" ");
  const newTitle = `${titlesci[0] }
  ${titlesci[1]}
  ${titlesci[2]}
  ${titlesci[3]}
  ${titlesci[4]}
  ${titlesci[5]}
  ${titlesci[6]}
  ${titlesci[7]}
  ${titlesci[8]}
  ${titlesci[9]}
  ${titlesci[10]}

 ...`
    
  return newTitle;
};

export default shorten;