import EnumAuthorizerDTO from "./EnumAuthorizerDTO";

export default class NFEStatusSnapshotFilterDTO {
    public page: number;
	public rows: number;
	public captureMoment: Date;
	public authorizers: EnumAuthorizerDTO[];
	public distinctByAuthorizerLatest: boolean;
}