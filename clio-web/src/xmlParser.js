// import xml2json from 'xml2json';
import xmljs from 'xml-js'
import _ from 'lodash';

function xmlToJSON(xml) {
  var options = { compact: true, spaces: 4 };
  let result = xmljs.xml2js(xml, options);

  console.log(result.indexFile);

  const data = {};
  data.properties = {};
  data.required = [];
  data.type = 'object';

  // const schema = {
  //   title: 'Rookie',
  //   type: 'object',
  //   properties: {
  //     name: { type: 'string', pattern: "^([a-zA-Z])+$" },
  //     age: {
  //       type: 'integer',
  //       minimum: 0,
  //       maximum: 100,
  //     },
  //     gender: { type: 'string', pattern: "^([a-zA-Z])+$" },
  //     residence: { type: 'string', pattern: "^([a-zA-Z])+$" },
  //     dateOfArrival: {
  //       type: "string",
  //       pattern: "(\\d{2}\\/\\d{2}\\/\\d{4})",
  //     },
  //     nameOfShip: { type: 'string', pattern: "^([a-zA-Z])+$" },
  //     from: { type: 'string', pattern: "^([a-zA-Z])+$" },
  //
  //   },
  //   // required: ['from'],
  //   required: ['name', 'age', 'gender', 'residence', 'nameOfShip', 'from', 'dateOfArrival'],
  // };

  const columns = result.indexFile.columns.column;

  for (let i = 0; i < columns.length; i++) {
    const name = _.camelCase(result.indexFile.columns._comment[i]);
    const required = columns[i].required._text;
    const type = columns[i].type._text;
    const validations = columns[i].validations.validation;
    let pattern = '';
    let min = '';
    let max = '';
    let allowedValues = [];
    let format = '';

    if ('parsing' in columns[i]) {
      format = columns[i].parsing.format._text;
    }

    // console.log(validations)
    for (let key in validations) {
      // console.log(key)
      // console.log(validations[key])
      if ('pattern' in validations[key]) {
        pattern = validations[key].pattern._text;
      }

      if ('min' in validations[key]) {
        min = validations[key]['min']._text
      }

      if ('max' in validations[key]) {
        max = validations[key]['max']._text
      }

      if ('allowedValues' in validations[key]) {
        for (let j = 0; j < validations[key]['allowedValues'].value.length; j++) {
          allowedValues.push(validations[key]['allowedValues'].value[j]._text);
        }
      }

    }
    if (required === 'true') {
      data.required.push(name);
    }

    data.properties[name] = {};
    data.properties[name].type = type;
    // data.properties[name].type = 'string';
    if (data.properties[name].type === 'date') {
      data.properties[name].type = 'string';
    } else {
      data.properties[name].type = type;
    }
    if (pattern.length !== 0) {
      data.properties[name].pattern = '^(' + pattern + ')+$';
      data.properties[name].pattern = pattern;
    }
    if (min.length !== 0) {
      data.properties[name].minimum = parseInt(min);
    }
    if (max.length !== 0) {
      data.properties[name].maximum = parseInt(max);
    }
    if (allowedValues.length !== 0) {
      data.properties[name].enum = allowedValues;
    }
  }

  console.log(data);

  return data;
}

// function xmlToJSON(xml) {
//   var obj = {};
//
//   if (xml.nodeType === 1 && xml.attributes.length > 0) {
//     obj["@attributes"] = {};
//     for (var j = 0; j < xml.attributes.length; j++) {
//       var attribute = xml.attributes.item(j);
//       obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//     }
//   } else if (xml.nodeType === 3) {
//     obj = xml.nodeValue;
//   }
//
//   if (!xml.hasChildNodes()) return obj;
//
//   xml.childNodes.forEach((childNode, i) => {
//     var item = xml.childNodes.item(i);
//
//     if (item.nodeName === '#comment' && !obj['#comment']) {
//       obj['#comment'] = item.nodeValue;
//     }
//
//     var nodeName = item.nodeName;
//
//     if (typeof (obj[nodeName]) == "undefined") {
//       obj[nodeName] = xmlToJSON(item);
//     } else {
//       if (typeof (obj[nodeName].push) == "undefined") {
//         if (nodeName !== '#text') {
//           var old = obj[nodeName];
//           obj[nodeName] = [];
//           obj[nodeName].push(old);
//         }
//       }
//       if (nodeName !== '#text') {
//         if (nodeName === '#comment') {
//           if (obj[nodeName][0] !== item.nodeValue) {
//             obj[nodeName].push(item.nodeValue);
//           }
//         } else {
//           obj[nodeName].push(xmlToJSON(item));
//         }
//       }
//     }
//
//   })
//
//   return obj;
// }

export { xmlToJSON }
