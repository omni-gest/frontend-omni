import { useEffect, useState } from "react";


import Content from "../../../../components/Content";
import PageHeader from "../../../../components/PageHeader";

import { getEstoque } from "../../../../services/estoque";
import { getComboMateriais } from "../../../../services/comboMaterial";
import { formatDate } from "../../../../utils/dateHelper";
import KitForm from "./kitForm";
import KitTable from "./kitTable";
import { formatCurrencyString, parseCurrencyToInt } from "../../../../utils/format";

export default function KitMaterial() {

    const [regs, setRegs] = useState([]);

    const [totalRows, setTotalRows] = useState(0);
    const [regEdited, setRegEdited] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Chamada da API - Lista todos os materiais
    const fetchServices = async (filter, pageNumber, totalSize) => {
        try {
            const response = await getComboMateriais('', pageNumber, totalSize);
            setRegs(response.items);
            setTotalRows(response.total)
            setModalIsOpen(false)
        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };

    const handleEdit = (id_combo) => {
        let edit = regs.filter((reg) => reg.id_combo == id_combo)[0];
        edit = {
            id_combo_cmb: edit.id_combo,
            des_combo_cmb: edit.desc_combo,
            id_centro_custo_cmb: edit.id_centro_custo,
            vlr_combo_cmb: formatCurrencyString((edit.vlr_combo_cmb * 100).toString()),
            materiaisOriginais: edit.materiais,
        }
        setRegEdited(edit)
        setModalIsOpen(true);
    }


    return (
        <Content>
            <PageHeader
                onClick={() => {
                    setRegEdited(null);
                    setModalIsOpen(true)
                }}
                adicionar='Novo'
                exportar='Exportar'
                exportFilename='export_combo'
                dataset={regs.map(reg=>({'ID':reg.id_combo, 'Descrição': reg.desc_combo,'Centro de Custo': reg.des_centro_custo_cco, 'Data Criação': formatDate(reg.created_at)}))}
            />
            <KitTable totalRows={totalRows} data={regs} handleEdit={handleEdit} refresh={fetchServices}/>
            {modalIsOpen && <KitForm kitEditing={regEdited} onClose={() => { setModalIsOpen(false) }} visible={modalIsOpen} refresh={fetchServices}/>}
        </Content>
    )
}