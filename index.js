var soap = require('soap');

const { securityKey, securityKeyForCreateLabel, securityKeyForGetTracking } = require('./security');
const statusCodes = require('./statusCodes');
const merchant = process.env.ENSEIGNE || 'BDTEST13';
const privateKey = process.env.PRIVATE_KEY || 'PrivateK';
const publicUrl = 'https://www.mondialrelay.com/';
const apiUrl = 'https://api.mondialrelay.com/Web_Services.asmx?WSDL';


const validateStatusCode = (code) => {
    const validCodes = ['0', '80', '81', '82', '83'];
    return validCodes.includes(code);
}

const createClient = (callback) => {
    return soap.createClient(apiUrl, (err, client) => {
        if (err) {
            return callback(err);
        }
        client.setEndpoint(apiUrl);
        return callback(null, client);
    });
}

// WSI2_RechercheCP
const searchZipCodes = (args, privateKeyArg = privateKey) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args), privateKeyArg);
            client.WSI2_RechercheCP(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (validateStatusCode(result.WSI2_RechercheCPResult.STAT)) {
                    return resolve(result.WSI2_RechercheCPResult.Liste.Commune);
                } else {
                    return reject(statusCodes[result.WSI2_RechercheCPResult.STAT]);
                }
            });
        });
    });
}

// WSI4_PointRelais_Recherche
const searchPointsRelais = (args, privateKeyArg = privateKey) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args), privateKeyArg);
            client.WSI4_PointRelais_Recherche(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (validateStatusCode(result.WSI4_PointRelais_RechercheResult.STAT)) {
                    return resolve(result.WSI4_PointRelais_RechercheResult?.PointsRelais?.PointRelais_Details);
                } else {
                    return reject(statusCodes[result.WSI4_PointRelais_RechercheResult.STAT]);
                }
            });
        });
    });
}

// WSI2_CreationEtiquette
const createLabel = (args, privateKeyArg = privateKey) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
            if (err) {
                return reject(err);
            }

            args.Security = securityKeyForCreateLabel(args, privateKeyArg);
            client.WSI2_CreationEtiquette(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (validateStatusCode(result.WSI2_CreationEtiquetteResult.STAT)) {
                    if (!result.WSI2_CreationEtiquetteResult.URL_Etiquette.startsWith('http')) {
                        const url = result.WSI2_CreationEtiquetteResult.URL_Etiquette;
                        result.WSI2_CreationEtiquetteResult.URL_Etiquette = `${publicUrl}${url}`;
                    }
                    return resolve(result.WSI2_CreationEtiquetteResult);
                } else {
                    return reject(statusCodes[result.WSI2_CreationEtiquetteResult.STAT]);
                }
            });
        });
    });
}

// WSI3_GetEtiquettes
const getLabels = (args, privateKeyArg = privateKey) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args), privateKeyArg);
            client.WSI3_GetEtiquettes(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if (validateStatusCode(result.WSI3_GetEtiquettesResult.STAT)) {
                    return resolve(result.WSI3_GetEtiquettesResult);
                } else {
                    return reject(statusCodes[result.WSI3_GetEtiquettesResult.STAT]);
                }
            });
        });
    });
}

// WSI2_STAT_Label
const getStatMessage = (args, privateKeyArg = privateKey) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args), privateKeyArg);
            client.WSI2_STAT_Label(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.WSI2_STAT_LabelResult);
            });
        });
    });
}

// WSI2_TracingColisDetaille
const getTracking = (args, privateKeyArg = privateKey) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKeyForGetTracking(args, privateKeyArg);
            client.WSI2_TracingColisDetaille(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if (validateStatusCode(result.WSI2_TracingColisDetailleResult.STAT)) {
                    return resolve(result.WSI2_TracingColisDetailleResult);
                } else {
                    return reject(statusCodes[result.WSI2_TracingColisDetailleResult.STAT]);
                }
            });
        });
    });
}

module.exports = {
  publicUrl,
  apiUrl,
  statusCodes,
  securityKey,
  validateStatusCode,
  searchZipCodes,
  searchPointsRelais,
  createLabel,
  getLabels,
  getStatMessage,
  getTracking,
};
