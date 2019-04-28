function getUrlParam() {
  var obj: object = {};
  //获取url的参数部分
  var params = window.location.search.substr(1);
  //[^&=]+ 表示不含&或=的连续字符，加上()就是提取对应字符串
  params.replace(/([^&=]+)=([^&=]*)/gi, function(rs, $1, $2) {
    obj[$1] = isNaN(+decodeURIComponent($2)) ? decodeURIComponent($2) : +decodeURIComponent($2);
    return '';
  });

  return obj;
}

/**
 * get url params
 */
export default getUrlParam;
