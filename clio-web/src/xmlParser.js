function xmlToJSON(xml) {
  var obj = {};
  if (xml.nodeType === 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else
    if (xml.nodeType === 3) {
      obj = xml.nodeValue;
    }
  if (xml.hasChildNodes()) {
    // console.log(xml)
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      // console.log(item.nodeName)
      if (item.nodeName === '#comment') {
        if (!obj['#comment']) {
          obj['#comment'] = item.nodeValue;
        }
      }
      var nodeName = item.nodeName;

      if (typeof (obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJSON(item);
      } else {
        if (typeof (obj[nodeName].push) == "undefined") {
          if (nodeName !== '#text') {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
        }
        if (nodeName !== '#text') {
          if (nodeName === '#comment') {
            if (obj[nodeName][0] !== item.nodeValue) {
              obj[nodeName].push(item.nodeValue);
            }
          } else {
            obj[nodeName].push(xmlToJSON(item));
          }
        }
      }
    }
  }
  return obj;
}

export { xmlToJSON }
