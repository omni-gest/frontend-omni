import { useEffect, useState } from "react";
import BarChart from "../../../components/BarGraph";
import Content from "../../../components/Content";
import SelectBox from "../../../components/Select";
import { CardsContainer, Card } from "./style.js";
import { formatCurrency } from "../../../utils/format.js";

import TriggerButton from "../../../components/TriggerButton";
import {
  getTopTenSaleMaterialsDashboard,
  getTopTenSaleValueDashboard,
  getTopFuncionariosPorVenda,
  getTopVendasPorCentroCusto,
  getTopVendasPorCliente,
  getTotalVendasPorOrigemCliente,
  getTotalSale,
} from "../../../services/graphs";
import {
  ChartContainer,
  ChartWrapper,
  CheckboxGroup,
  DashboardContainer,
  FilterContainer,
  SelectWrapper,
  SmallChartWrapper,
} from "./style";
import DoubleBarGraph from "../../../components/DoubleBarGraph";
import PieChart from "../../../components/PieChart";
import { format } from "date-fns";

export default function SaleDashboard() {
  const [cardData, setCardData] = useState([]);
  const [costCenters, setCostCenters] = useState([]);
  const [topTenSalesGraphData, setTopTenSalesGraphData] = useState([]);
  const [topTenSalesValueGraphData, setTopTenSalesValueGraphData] = useState(
    []
  );
  const [topFuncionariosPorVenda, setTopFuncionariosPorVenda] = useState([]);
  const [topVendasPorCentroCusto, setTopVendasPorCentroCusto] = useState([]);
  const [topVendasPorCliente, setTopVendasPorCliente] = useState([]);
  const [totalVendasPorOrigemCliente, setTotalVendasPorOrigemCliente] =
    useState([]);
  const [selectedCostCenters, setSelectedCostCenters] = useState([]);
  const [dateFilter, setDateFilter] = useState(30);

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return format(d, "yyyy-MM-dd");
  });
  const [endDate, setEndDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd")
  );

  const [showDynamicModal, setShowDynamicModal] = useState(false);
  const [tmpStartDate, setTmpStartDate] = useState(startDate);
  const [tmpEndDate, setTmpEndDate] = useState(endDate);
  const [loading, setLoading] = useState(false);

  const getRange = () => {
    if (dateFilter === 1) {
      return [`${startDate} 00:00:00`, `${endDate} 23:59:59`];
    }
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - dateFilter);
    return [
      `${format(pastDate, "yyyy-MM-dd")} 00:00:00`,
      `${format(new Date(), "yyyy-MM-dd")} 23:59:59`,
    ];
  };

  const fetchTotalSalesDashboard = async () => {
    const [from, to] = getRange();
    const response = await getTotalSale(
      selectedCostCenters.join(","),
      from,
      to
    );
    setCardData(response);
  };

  const fetchSaleDashboard = async () => {
    const [from, to] = getRange();
    const response = await getTopTenSaleMaterialsDashboard(
      selectedCostCenters.join(","),
      from,
      to
    );
    setTopTenSalesGraphData(response);
  };

  const fetchSaleValueDashboard = async () => {
    const [from, to] = getRange();
    const response = await getTopTenSaleValueDashboard(
      selectedCostCenters.join(","),
      from,
      to
    );
    setTopTenSalesValueGraphData(response);
  };

  const fetchTopFuncionariosPorVenda = async () => {
    const [from, to] = getRange();
    const response = await getTopFuncionariosPorVenda(
      selectedCostCenters.join(","),
      from,
      to
    );
    setTopFuncionariosPorVenda(response);
  };

  const fetchTopVendasPorCentroCusto = async () => {
    const [from, to] = getRange();
    const response = await getTopVendasPorCentroCusto(
      selectedCostCenters.join(","),
      from,
      to
    );
    setTopVendasPorCentroCusto(response);
  };

  const fetchTopVendasPorCliente = async () => {
    const [from, to] = getRange();
    const response = await getTopVendasPorCliente(
      selectedCostCenters.join(","),
      from,
      to
    );
    setTopVendasPorCliente(response);
  };

  const fetchTotalVendasPorOrigemCliente = async () => {
    const [from, to] = getRange();
    const response = await getTotalVendasPorOrigemCliente(
      selectedCostCenters.join(","),
      from,
      to
    );
    setTotalVendasPorOrigemCliente(response);
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchTotalSalesDashboard(),
        fetchSaleDashboard(),
        fetchSaleValueDashboard(),
        fetchTopFuncionariosPorVenda(),
        fetchTopVendasPorCentroCusto(),
        fetchTotalVendasPorOrigemCliente(),
        fetchTopVendasPorCliente(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatCostCenters = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const costCenters = userData.centro_custo_permission.map(
      ({ id_centro_custo_cco, des_centro_custo_cco }) => ({
        value: id_centro_custo_cco,
        label: des_centro_custo_cco,
      })
    );
    const selectedCostCenters = userData.centro_custo_permission.map(
      ({ id_centro_custo_cco }) => id_centro_custo_cco
    );

    setCostCenters(costCenters);
    setSelectedCostCenters(selectedCostCenters);
  };

  const getTopTenSalesLabels = () => {
    const labels = [];
    topTenSalesGraphData.map((data) => labels.push(data.nome_material));
    return labels;
  };

  const getTopTenSalesValues = () => {
    const values = [];
    topTenSalesGraphData.map((data) => values.push(data.quantidade_vendida));
    return values;
  };

  const getTopTenSalesValueLabels = () => {
    const labels = [];
    topTenSalesValueGraphData.map((data) => labels.push(data.nome_material));
    return labels;
  };

  const getTopTenSalesValueValues = () => {
    const values = [];
    topTenSalesValueGraphData.map((data) => {
      const newValue = data.valor_total_vendido
        .toString()
        .split(",")[0]
        .replace(".", "");
      values.push(newValue);
    });
    return values;
  };

  const getTopFuncionariosPorVendaLabels = () => {
    const labels = [];
    topFuncionariosPorVenda.map((data) => labels.push(data.nome_funcionario));
    return labels;
  };

  const getTopFuncionariosPorVendaValues = () => {
    const values1 = [];
    const values2 = [];
    topFuncionariosPorVenda.map((data) => {
      const newValue1 = data.quantidade_vendida;
      const newValue2 = data.valor_total_vendido
        .toString()
        .split(",")[0]
        .replace(".", "");
      values1.push(newValue1);
      values2.push(newValue2);
    });

    return {
      values1: values1,
      values2: values2,
    };
  };

  const getTopVendasPorCentroCustoLabels = () => {
    const labels = [];
    topVendasPorCentroCusto.map((data) =>
      labels.push(data.des_centro_custo_cco)
    );
    return labels;
  };

  const getTopVendasPorCentroCustoValues = () => {
    const values1 = [];
    const values2 = [];
    topVendasPorCentroCusto.map((data) => {
      const newValue1 = data.quantidade_vendida;
      const newValue2 = data.valor_total_vendido
        .toString()
        .split(",")[0]
        .replace(".", "");
      values1.push(newValue1);
      values2.push(newValue2);
    });

    return {
      values1: values1,
      values2: values2,
    };
  };

  const getTopVendasPorClienteLabels = () => {
    const labels = [];
    topVendasPorCliente.map((data) => labels.push(data.des_cliente_cli));
    return labels;
  };

  const getTopVendasPorClienteValues = () => {
    const values1 = [];
    const values2 = [];
    topVendasPorCliente.map((data) => {
      const newValue1 = data.quantidade_vendida;
      const newValue2 = data.valor_total_vendido
        .toString()
        .split(",")[0]
        .replace(".", "");
      values1.push(newValue1);
      values2.push(newValue2);
    });

    return {
      values1: values1,
      values2: values2,
    };
  };

  const getTotalVendasPorOrigemClienteLabels = () => {
    return totalVendasPorOrigemCliente.map(
      (data) => `${data.desc_origem_cliente_orc}: ${data.total_vendas}`
    );
  };

  const getTotalVendasPorOrigemClienteValues = () => {
    const values = [];
    totalVendasPorOrigemCliente.map((data) => values.push(data.total_vendas));

    return values;
  };

  const handleChangeValue = (e) => {
    const selectedValues = e.target.value.map((option) => option.value);
    setSelectedCostCenters(selectedValues);
  };

  useEffect(() => {
    formatCostCenters();
  }, []);

  useEffect(() => {
    // fetch when selected cost centers or date range changes
    fetchAll();
  }, [selectedCostCenters, dateFilter, startDate, endDate]);

  return (
    <Content>
      <DashboardContainer>
        <FilterContainer>
          <SelectWrapper>
            <label>Centro de Custo</label>
            <SelectBox
              options={costCenters ?? []}
              defaultValue={selectedCostCenters}
              name="id_centro_custo_und"
              onChange={handleChangeValue}
              error={null}
            />
          </SelectWrapper>
          <CheckboxGroup>
            <TriggerButton
              label="Hoje"
              active={dateFilter === 0}
              onClick={() => setDateFilter(0)}
            />
            <TriggerButton
              label="Última Semana"
              active={dateFilter === 7}
              onClick={() => setDateFilter(7)}
            />
            <TriggerButton
              label="Último Mês"
              active={dateFilter === 30}
              onClick={() => setDateFilter(30)}
            />
            <TriggerButton
              label="Dinâmico"
              active={dateFilter === 1}
              onClick={() => {
                setTmpStartDate(startDate);
                setTmpEndDate(endDate);
                setShowDynamicModal(true);
              }}
            />
          </CheckboxGroup>
        </FilterContainer>

        {loading && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.45)",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 28,
                borderRadius: 8,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                minWidth: 280,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  border: "4px solid #e6e6e6",
                  borderTop: "4px solid #9052F9",
                  borderRadius: "50%",
                  animation: "sd-spin 1s linear infinite",
                }}
              />
              <div style={{ fontWeight: 600 }}>Carregando dados...</div>
            </div>
            <style>{`@keyframes sd-spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        {showDynamicModal && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.45)",
              zIndex: 10000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                minWidth: 320,
                maxWidth: "90%",
              }}
            >
              <h3 style={{ margin: "0 0 12px 0" }}>Selecionar período</h3>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: 12, marginBottom: 6 }}>
                    Data Início
                  </label>
                  <input
                    type="date"
                    value={tmpStartDate}
                    onChange={(e) => setTmpStartDate(e.target.value)}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: 12, marginBottom: 6 }}>
                    Data Fim
                  </label>
                  <input
                    type="date"
                    value={tmpEndDate}
                    onChange={(e) => setTmpEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
              >
                <button
                  onClick={() => setShowDynamicModal(false)}
                  style={{ padding: "6px 10px" }}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // apply dates and refetch
                    setStartDate(tmpStartDate);
                    setEndDate(tmpEndDate);
                    setDateFilter(1);
                    setShowDynamicModal(false);
                    fetchAll();
                  }}
                  style={{
                    padding: "6px 10px",
                    background: "#9052F9",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                  }}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        )}
        <CardsContainer>
          <Card>
            <h3>Total de Vendas Finalizadas</h3>
            <p>
              {cardData?.total_vendas !== null ? cardData?.total_vendas : "-"}
            </p>
          </Card>
          <Card>
            <h3>Valor total de Vendas Finalizadas</h3>
            <p>
              {cardData?.valor_total !== null
                ? (cardData.valor_total / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "-"}
            </p>
          </Card>
        </CardsContainer>
        <ChartContainer>
          <SmallChartWrapper>
            <BarChart
              labels={getTopTenSalesLabels()}
              values={getTopTenSalesValues()}
              label="Materiais mais vendidos"
              backgroundColor="#9052F9"
              title="Top 10 Materiais Vendidos"
            />
          </SmallChartWrapper>
          <SmallChartWrapper>
            <BarChart
              labels={getTopTenSalesValueLabels()}
              values={getTopTenSalesValueValues()}
              label="Valores das vendas"
              backgroundColor="#9052F9"
              title="Top 10 Valores por Venda"
            />
          </SmallChartWrapper>
        </ChartContainer>
        <ChartContainer>
          <SmallChartWrapper>
            <DoubleBarGraph
              labels={getTopFuncionariosPorVendaLabels()}
              values1={getTopFuncionariosPorVendaValues().values1}
              values2={getTopFuncionariosPorVendaValues().values2}
              label1="Quantidade Vendida"
              label2="Valor Total Vendido"
              backgroundColor1="#9052F9"
              backgroundColor2="#52B6F9"
              title="Top 3 Funcionários"
            />
          </SmallChartWrapper>
          <SmallChartWrapper>
            <DoubleBarGraph
              labels={getTopVendasPorCentroCustoLabels()}
              values1={getTopVendasPorCentroCustoValues().values1}
              values2={getTopVendasPorCentroCustoValues().values2}
              label1="Quantidade Vendida"
              label2="Valor Total Vendido"
              backgroundColor1="#9052F9"
              backgroundColor2="#52B6F9"
              title="Vendas por Centro de Custo"
            />
          </SmallChartWrapper>
        </ChartContainer>
        <ChartContainer>
          <SmallChartWrapper>
            <DoubleBarGraph
              labels={getTopVendasPorClienteLabels()}
              values1={getTopVendasPorClienteValues().values1}
              values2={getTopVendasPorClienteValues().values2}
              label1="Quantidade Vendida"
              label2="Valor Total Vendido"
              backgroundColor1="#9052F9"
              backgroundColor2="#52B6F9"
              title="Vendas por Cliente"
            />
          </SmallChartWrapper>
          <SmallChartWrapper>
            <PieChart
              labels={getTotalVendasPorOrigemClienteLabels()}
              dataValues={getTotalVendasPorOrigemClienteValues()}
              title="Origem dos Clientes"
            />
          </SmallChartWrapper>
        </ChartContainer>
      </DashboardContainer>
    </Content>
  );
}
