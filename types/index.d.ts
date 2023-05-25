import statusCodes = require("./statusCodes");

export type CreateLabelArgs = {
  Enseigne: string,
  ModeCol: string,
  ModeLiv: string,
  NDossier?: string,
  NClient?: string,
  Expe_Langage: string,
  Expe_Ad1: string,
  Expe_Ad2?: string,
  Expe_Ad3: string,
  Expe_Ad4?: string,
  Expe_Ville: string,
  Expe_CP: string,
  Expe_Pays: string,
  Expe_Tel1: string,
  Expe_Tel2?: string,
  Expe_Mail?: string,
  Dest_Langage: string,
  Dest_Ad1: string,
  Dest_Ad2?: string,
  Dest_Ad3: string,
  Dest_Ad4?: string,
  Dest_Ville: string,
  Dest_CP: string,
  Dest_Pays: string,
  Dest_Tel1?: string,
  Dest_Tel2?: string,
  Dest_Mail?: string,
  Poids: string,
  Longueur?: string,
  Taille?: string,
  NbColis: string,
  CRT_Valeur: string,
  CRT_Devise?: string,
  Exp_Valeur?: string,
  Exp_Devise?: string,
  COL_Rel_Pays?: string,
  COL_Rel?: string,
  LIV_Rel_Pays?: string,
  LIV_Rel?: string,
  TAvisage?: string,
  TReprise?: string,
  Montage?: string,
  TRDV?: string,
  Assurance?: string,
  Instructions?: string,
  Texte?: string,
};

export type Label = {
  STAT: string
  ExpeditionNum: string,
  URL_Etiquette: string,
}

export type SearchArgs = {
  Enseigne: string;
  Pays: string;
  Ville: string;
  CP: string;
  NombreResultats: string;
  Latitude: string;
  Longitude: string;
};

export type RelayPoint = {
  STAT: string;
  Num: string;
  LgAdr1: string;
  LgAdr2: string;
  LgAdr3: string;
  LgAdr4: string;
  Ville: string;
  CP: string;
  Pays: string;
  Localisation1: string;
  Localisation2: string;
  Latitude: string;
  Longitude: string;
  TypeActivite: string;
  Information: string;
  Horaires_Lundi: { string: string[] },
  Horaires_Mardi: { string: string[] },
  Horaires_Mercredi: { string: string[] },
  Horaires_Jeudi: { string: string[] },
  Horaires_Vendredi: { string: string[] },
  Horaires_Samedi: { string: string[] },
  Horaires_Dimanche: { string: string[] },
  Informations_Dispo: null,
  URL_Photo: string,
  URL_Plan: string,
  Distance: string,
}

export type GetTrackingArgs = {
  Enseigne: string;
  Expedition: string;
  Langue: string;
}

export type Tracking = {
  STAT: string;
  Libelle01: string;
  Relais_Libelle: string;
  Relais_Num: string;
  Libelle02: string;
  Tracing: {
    ret_WSI2_sub_TracingColisDetaille: {
      Libelle: string,
      Date: string,
      Heure: string,
      Emplacement: string,
      Relais_Num: string,
      Relais_Pays: string,
    }[]
  }
};

export const publicUrl: "http://www.mondialrelay.com/";
export const apiUrl: "https://api.mondialrelay.com/Web_Services.asmx?WSDL";

export function securityKey(args: any, privateKey?: string): string;
export function validateStatusCode(code: any, privateKey?: string): boolean;
export function searchZipCodes(args: any, privateKey?: string): Promise<any>;
export function searchPointsRelais(args: SearchArgs, privateKey?: string): Promise<RelayPoint[]>;
export function createLabel(args: CreateLabelArgs, privateKey?: string): Promise<Label>;
export function getLabels(args: any, privateKey?: string): Promise<any>;
export function getStatMessage(args: any, privateKey?: string): Promise<any>;
export function getTracking(args: GetTrackingArgs, privateKey?: string): Promise<Tracking>;
export { statusCodes };
