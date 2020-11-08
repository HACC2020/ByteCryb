// import xml2json from 'xml2json';
import xmljs from 'xml-js'
import _  from 'lodash';

function logRecursive(object) {
  for (let key in object) {
    var value = object[key];
    if (typeof value === 'object') {
      // console.log('{');
      console.log(key)
      logRecursive(value);
      // console.log('}');
    } else {
      console.log(value)
      // console.log(value);
    }
  }
}

function xmlToJSON(xml) {
  var options = { compact: true, spaces: 4 };
  let result = xmljs.xml2js(xml, options);

  console.log(result.indexFile);

  const data = {};
  data.properties = {};
  const subData = [];

  const schema = {
    title: 'Rookie',
    type: 'object',
    properties: {
      name: { type: 'string', pattern: "^([a-zA-Z])+$" },
      age: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
      },
      gender: { type: 'string', pattern: "^([a-zA-Z])+$" },
      residence: { type: 'string', pattern: "^([a-zA-Z])+$" },
      dateOfArrival: {
        type: "string",
        pattern: "(\\d{2}\\/\\d{2}\\/\\d{4})",
      },
      nameOfShip: { type: 'string', pattern: "^([a-zA-Z])+$" },
      from: { type: 'string', pattern: "^([a-zA-Z])+$" },

    },
    // required: ['from'],
    required: ['name', 'age', 'gender', 'residence', 'nameOfShip', 'from', 'dateOfArrival'],
  };

  const columns = result.indexFile.columns.column;


  // console.log(logRecursive(result))

  for (let i = 0; i < columns.length; i++) {
    const name = _.camelCase(result.indexFile.columns._comment[i]);
    const required = columns[i].required._text;
    const type = columns[i].type._text;
    const validations = columns[i].validations.validation;
    // console.log(validations)
    for (let key in validations) {
       console.log(key)
      console.log(validations[key])
      for (let key2 in validations[key]) {
        // console.log(validations[key][key2])
      }
    }
    data.properties[name] = {};
    data.properties[name].type = type
  }

  console.log(data)

  // for (let i = 0; i < obj.indexFile.columns.column.length; i++) {
  //   // const name = obj.indexFile.columns['#comment'][i];
  //   // subData.push({
  //   //   [name]: {
  //   //     type: obj.indexFile.columns.column[i].type['#text'],
  //   //     required: obj.indexFile.columns.column[i].required['#text'],
  //   //   }
  //   //
  //   // });
  //   // console.log(obj.indexFile.columns['#comment'][i]);
  //   // console.log(obj.indexFile.columns.column[i].type['#text']);
  //   // console.log(obj.indexFile.columns.column[i].required['#text']);
  //   // console.log(obj.indexFile.columns.column[i].validations.validation.configuration)
  //   // for (let j = 0; j < obj.indexFile.columns.column[i].validations.validation.configuration.length; j++) {
  //   //   // console.log(obj.indexFile.columns.column[i].validations.validation)
  //   // }
  //   // console.log('---')
  // }

  // data.push({
  //   properties: subData,
  // });

  // console.log(data);

  //return result;
  //console.log(result)

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
