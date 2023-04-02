import statusCodes = require("./statusCodes");

export interface CreateLabelArgs {
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


export const publicUrl: "http://www.mondialrelay.com/";
export const apiUrl: "https://api.mondialrelay.com/Web_Services.asmx?WSDL";

export function securityKey(args: any): string;
export function validateStatusCode(code: any): boolean;
export function searchZipCodes(args: any): Promise<any>;
export function searchPointsRelais(args: any): Promise<any>;
export function createLabel(args: CreateLabelArgs, privateKey?: string): Promise<any>;
export function getLabels(args: any): Promise<any>;
export function getStatMessage(args: any): Promise<any>;
export function getTracking(args: any): Promise<any>;
export { statusCodes };
