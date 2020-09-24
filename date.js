//thats a glimpse of how do we create our own module andexport them hwerever we want
//nodejs module.exports
exports.getDate = function () {
const today = new Date();                              //stack overflow -How to format a JavaScript date
const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long'
};
return today.toLocaleDateString("en-US", options);
}


module.exports.getDay = getDay;
function getDay(){
  const today = new Date();
                                    //stack overflow -How to format a JavaScript date
  const options = {
    weekday: 'long',
  };
  return today.toLocaleDateString("en-US", options);
}

                          //we can do it by any way getDate or getDay as to short code we will use first method checl documentation to know whats happening
