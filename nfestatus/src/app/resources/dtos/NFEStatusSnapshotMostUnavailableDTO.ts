import EnumAuthorizerDTO from "./EnumAuthorizerDTO";
import EnumServiceDTO from "./EnumServiceDTO"; 

export default class NFEStatusSnapshotMostUnavailableDTO {
    public authorizer: EnumAuthorizerDTO;
	public service: EnumServiceDTO;
	public unavailableCount: number;
	public lastUnavailableMoment: Date;
}