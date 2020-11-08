export default interface QueryOption {
    optionLabel: string;
}

class QueryByDistinctAuthorizerAndLatestCapture implements QueryOption {
    public optionLabel = "Consultar mais recentes com Autorizadores distintos";
}

class QueryTreatUnknownNFEStatusAsOffline implements QueryOption {
    public optionLabel = "Considerar Status Desconhecido como Offline";
}

const queryByDistinctAuthorizerAndLatestCapture = new QueryByDistinctAuthorizerAndLatestCapture();
const queryTreatUnknownNFEStatusAsOffline = new QueryTreatUnknownNFEStatusAsOffline();

export { queryByDistinctAuthorizerAndLatestCapture, queryTreatUnknownNFEStatusAsOffline };
