import EnumAuthorizerDTO from "./EnumAuthorizerDTO";
import EnumNFEStatusDTO from "./EnumNFEStatusDTO";

export default class NFEStatusSnapshotDTO {
    public idNFEStatusSnapshot: number;
	
	public captureMoment: Date;
	
	public authorizer: EnumAuthorizerDTO;
	
	public nfeStatusAuthorization4: EnumNFEStatusDTO;
	
	public nfeStatusAuthorization4Return: EnumNFEStatusDTO;
	
	public nfeStatusInutilisation4: EnumNFEStatusDTO;
	
	public nfeStatusProtocol4Query: EnumNFEStatusDTO;
	
	public nfeStatusService4Status: EnumNFEStatusDTO;
	
	public averageTimeMilis: number;
	
	public nfeStatusRegister4Query: EnumNFEStatusDTO;
	
	public nfeStatusEvent4Reception: EnumNFEStatusDTO;
}