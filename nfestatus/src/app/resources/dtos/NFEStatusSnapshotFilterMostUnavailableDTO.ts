import EnumServiceDTO from "./EnumServiceDTO";

export default class NFEStatusSnapshotFilterMostUnavailableDTO {
    public page: number;
	public rows: number;
    public services: EnumServiceDTO[];
    public treatUnknownStatusAsOffline: boolean;
}