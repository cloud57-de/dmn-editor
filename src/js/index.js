import MarterialDesign from 'material-design-lite';
import DmnJS from 'dmn-js';

var xml; // my DMN 1.3 xml
var viewer = new DmnJS({
  container: '#editor'
});

viewer.importXML(xml, function(err) {

  if (err) {
    console.log('error rendering', err);
  } else {
    console.log('rendered');
  }
});