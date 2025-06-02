import { Route, Routes } from 'react-router-dom';

//Pages
import Agendamento from '../pages/Agendamento';
import AgendamentoCalendario from '../pages/Agendamento/calendario';
import Baixa from '../pages/Almoxarifado/Material';
import Estoque from '../pages/CadastroBase/Almoxarifado/Estoque';
import KitMaterial from '../pages/CadastroBase/Almoxarifado/KitMaterial';
import Material from '../pages/CadastroBase/Almoxarifado/Material';
import Unidade from '../pages/CadastroBase/Almoxarifado/Unidade';
import InstituicaoPagamento from '../pages/CadastroBase/Financeiro/InstituicaoPagamento';
import MetodoPagamento from '../pages/CadastroBase/Financeiro/MetodoPagamento';
import Cargo from '../pages/CadastroBase/Perfil/Cargo';
import CentroCusto from '../pages/CadastroBase/Perfil/CentroCusto';
import Funcionario from '../pages/CadastroBase/Perfil/Funcionario';
import Usuario from '../pages/CadastroBase/Perfil/Usuario';
import Cliente from '../pages/CadastroBase/Perfil/Cliente';
import OrigemCliente from '../pages/CadastroBase/Perfil/OrigemCliente';
import TipoServico from '../pages/CadastroBase/Servico/TipoServico';
import ListIcons from '../pages/Debug/ListIcons';
import Empty from "../pages/Empty";
import Page404 from '../pages/ErrorPage/404';
import Home from "../pages/Home";
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Service from '../pages/Servico';
import EstoqueMaterial from '../pages/Almoxarifado/EstoqueMaterial'
import Sale from '../pages/Venda/Vendas';
import Company from '../pages/Empresa/Empresas';
import UserPermissions from '../pages/Permissoes/PermissoesUsuario';
import CompanyPermissions from '../pages/Permissoes/PermissoesEmpresa';
import PermissoesCentroCusto from '../pages/Permissoes/PermissoesCentroCusto';
import ServiceDashboard from '../pages/Servico/serviceDashboard';
import SaleDashboard from '../pages/Venda/Vendas/saleDashboard';
import FinanceiroReceber from '../pages/Financeiro/Receber';
import FinanceiroPagar from '../pages/Financeiro/Pagar';
import PermissoesEstoque from '../pages/Permissoes/PermissoesEstoque';

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="/" element={<Home />} />
                <Route path="/empty" element={<Empty />} />
                {/* <Route path="/cadastroMaterial" element={<RegisterMaterial />} /> */}
                <Route path="/service" element={<Service />} />
                <Route path="/servico/novo" element={<Service reg={{}} />} />
                <Route path="/servico/finalizar" element={<Service tela='finalizar' />} />
                <Route path="/servico/dashboard" element={<ServiceDashboard />} />
                <Route path="/almoxarifado/consulta-estoque" element={<EstoqueMaterial />} />
                <Route path="/almoxarifado/baixa/entrada" element={<Baixa tipoMovimentacao='entrada' />} />
                <Route path="/almoxarifado/baixa/saida" element={<Baixa tipoMovimentacao='saida' />} />
                <Route path="/cadastro-base/servico/tipo-servico" element={<TipoServico />} />
                <Route path="/cadastro-base/almoxarifado/unidade" element={<Unidade />} />
                <Route path="/cadastro-base/almoxarifado/material" element={<Material />} />
                <Route path="/cadastro-base/almoxarifado/estoque" element={<Estoque />} />
                <Route path="/cadastro-base/almoxarifado/kit" element={<KitMaterial />} />
                <Route path="/cadastro-base/financeiro/metodo-pagamento" element={<MetodoPagamento />} />
                <Route path="/cadastro-base/financeiro/instituicao-pagamento" element={<InstituicaoPagamento />} />
                <Route path="/cadastro-base/perfil/centro-custo" element={<CentroCusto />} />
                <Route path="/cadastro-base/perfil/cargo" element={<Cargo />} />
                <Route path="/cadastro-base/perfil/funcionario" element={<Funcionario />} />
                <Route path="/cadastro-base/perfil/usuario" element={<Usuario />} />
                <Route path="/cadastro-base/perfil/cliente" element={<Cliente />} />
                <Route path="/cadastro-base/perfil/origem-cliente" element={<OrigemCliente />} />
                <Route path="/listicons" element={<ListIcons />} />
                <Route path="/venda" element={<Sale />} />
                <Route path="/venda/dashboard" element={<SaleDashboard />} />
                <Route path="/empresas" element={<Company />} />
                <Route path="/cadastro-base/permissoes/permissoes-usuario" element={<UserPermissions />} />
                <Route path="/cadastro-base/permissoes/permissoes-empresa" element={<CompanyPermissions />} />
                <Route path="/cadastro-base/permissoes/permissoes-centro-custo" element={<PermissoesCentroCusto />} />
                <Route path="/cadastro-base/permissoes/permissoes-estoque" element={<PermissoesEstoque />} />
                <Route path="/financeiro/a-receber" element={<FinanceiroReceber />} />
                <Route path="/financeiro/a-pagar" element={<FinanceiroReceber />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/agendamento" >
                <Route path="/agendamento/:empresa" element={<Agendamento />} />
                <Route path="/agendamento/:empresa/calendario" element={<AgendamentoCalendario />} />
                <Route path="/agendamento" element={<Page404 />} />
                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    )
}

export default RoutesApp;