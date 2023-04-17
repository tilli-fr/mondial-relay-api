const crypto = require('crypto');

// calculate Mondial Relay security key
const securityKey = (args, privateKeyArg = privateKey) => {
  // TODO: sort keys according to the doc: https://www.mondialrelay.fr/media/123859/solution-web-service-v59.pdf
  const content = args.filter(n => n).join('') + privateKeyArg;

  return crypto.createHash('md5').update(content).digest('hex').toUpperCase();
}

const createLabelArgsOrder = [
  'Enseigne',
  'ModeCol',
  'ModeLiv',
  'NDossier',
  'NClient',
  'Expe_Langage',
  'Expe_Ad1',
  'Expe_Ad2',
  'Expe_Ad3',
  'Expe_Ad4',
  'Expe_Ville',
  'Expe_CP',
  'Expe_Pays',
  'Expe_Tel1',
  'Expe_Tel2',
  'Expe_Mail',
  'Dest_Langage',
  'Dest_Ad1',
  'Dest_Ad2',
  'Dest_Ad3',
  'Dest_Ad4',
  'Dest_Ville',
  'Dest_CP',
  'Dest_Pays',
  'Dest_Tel1',
  'Dest_Tel2',
  'Dest_Mail',
  'Poids',
  'Longueur',
  'Taille',
  'NbColis',
  'CRT_Valeur',
  'CRT_Devise',
  'Exp_Valeur',
  'Exp_Devise',
  'COL_Rel_Pays',
  'COL_Rel',
  'LIV_Rel_Pays',
  'LIV_Rel',
  'TAvisage',
  'TReprise',
  'Montage',
  'TRDV',
  'Assurance',
  'Instructions',
  'Texte',
];

const securityKeyForCreateLabel = (argsObject, privateKeyArg = privateKey) => {
  // transform argsObject into an array sorted by keys according to createLabelArgsOrder
  const args = Object.entries(argsObject)
    .sort(([key1], [key2]) => createLabelArgsOrder.indexOf(key1) - createLabelArgsOrder.indexOf(key2))
    .map(([key, value]) => value);
  const content = args.filter(n => n).join('') + privateKeyArg;

  return crypto.createHash('md5').update(content).digest('hex').toUpperCase();
}

module.exports = {
  securityKey,
  securityKeyForCreateLabel,
};
