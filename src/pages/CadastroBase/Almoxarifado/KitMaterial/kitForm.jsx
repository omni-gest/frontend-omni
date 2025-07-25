import { useEffect, useState } from "react";
import yup from "../../../../utils/yup";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../../components/Buttons/ButtonSubmit";
import { getCentroCusto } from "../../../../services/centroCusto";
import { saveEstoque } from "../../../../services/estoque";
import { FormGroup } from "./style";
import SelectBox from "../../../../components/Select";
import { getMaterial } from "../../../../services/material";
import {
  createComboMaterial,
  updateComboMaterial,
} from "../../../../services/comboMaterial";
import {
  formatCurrencyString,
  parseCurrencyToInt,
} from "../../../../utils/format";

const schema = yup.object().shape({
  des_combo_cmb: yup.string().min(1).required(),
  id_centro_custo_cmb: yup.number().required().positive().integer(),
});

export default function KitForm({ kitEditing, onClose, visible, refresh }) {
  const [form, setForm] = useState(kitEditing ?? {});
  const [error, setError] = useState({});
  const [kitValue, setKitValue] = useState(
    kitEditing?.vlr_combo_cmb
      ? parseInt(parseCurrencyToInt(kitEditing.vlr_combo_cmb))
      : 0
  );
  const [formData, setFormData] = useState({});
  const [materiaisOriginais, setMateriaisOriginais] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const isEditing = kitEditing ?? false;

  useEffect(() => {
    console.log(isEditing)
    if (isEditing) {
      setForm((prev) => ({
        ...prev,
        materiais: kitEditing.materiaisOriginais.map((material) => ({
          value: material.id_material,
          label: `${material.nome_material} - ${material.nome_unidade}`,
          custom: [
            {
              prefixDefault: material.nome_unidade,
              label: "Quantidade",
              column: "qtd_material_cbm",
              value: material.qtd_material,
              type: "number",
            },
          ],
        })),
      }));
      setMateriaisOriginais(kitEditing.materiaisOriginais);
    }
    const fetchData = async () => {
      try {
        const centroCusto = await getCentroCusto();
        const centroCustoTypeOptions = centroCusto.items.map(
          ({ id_centro_custo_cco, des_centro_custo_cco }) => ({
            value: id_centro_custo_cco,
            label: des_centro_custo_cco,
          })
        );
        setFormData({ centroCusto: centroCustoTypeOptions });
        if (isEditing) {
          getMaterial(true, kitEditing.id_centro_custo_cmb).then((materiais) => {
            const materialOptions = materiais
              .map((item) => {
                return {
                  id_material_cbm: item.id_material_mte,
                  des_material_mte: item.des_material_mte,
                  des_reduz_unidade_und: item.des_reduz_unidade_und,
                };
              })
              .map((item) => {
                return {
                  value: { id_material_cbm: item.id_material_cbm },
                  label: `${item.des_material_mte} - ${item.des_reduz_unidade_und}`,
                  custom: [
                    {
                      prefixDefault: item.des_reduz_unidade_und,
                      label: "Quantidade",
                      column: "qtd_material_cbm",
                      value: 1,
                      type: "number",
                    },
                  ],
                };
              });
            setFormData((prev) => ({ ...prev, materiais: materialOptions }));
          });
        }
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    };
    fetchData();
  }, []);

  const handleChangeValue = (event) => {
    const eventName = event.target.name.replace(/\[|\]/g, "");
    let value = event.target.value;

    setForm((prev) => ({ ...prev, [eventName]: value }));

    if (eventName == "id_centro_custo_cmb") {
      getMaterial(true, value).then((materiais) => {
        const materialOptions = materiais
          .map((item) => {
            return {
              id_material_cbm: item.id_material_mte,
              des_material_mte: item.des_material_mte,
              des_reduz_unidade_und: item.des_reduz_unidade_und,
            };
          })
          .map((item) => {
            return {
              value: { id_material_cbm: item.id_material_cbm },
              label: `${item.des_material_mte} - ${item.des_reduz_unidade_und}`,
              custom: [
                {
                  prefixDefault: item.des_reduz_unidade_und,
                  label: "Quantidade",
                  column: "qtd_material_cbm",
                  value: 1,
                  type: "number",
                },
              ],
            };
          });
        setFormData((prev) => ({ ...prev, materiais: materialOptions }));
      });
    }

    if (eventName == "materiais") {
      const materiais = value.map((material) => {
        return {
          id_material_cbm: material.value.id_material_cbm ?? material.value,
          qtd_material_cbm: material.custom[0].value,
        };
      });
      setForm((prev) => ({ ...prev, [eventName]: materiais }));
    }

    if (eventName == "vlr_combo_cmb") {
      value = parseInt(parseCurrencyToInt(event.target.value));
      const formattedValue = formatCurrencyString(event.target.value);
      setKitValue(value);
      setForm((prev) => ({ ...prev, [eventName]: formattedValue }));
    }
  };

  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    try {
      let body = { ...form };
      body.vlr_combo_cmb = kitValue;
      let success;
      if (!isEditing) {
        success = await createComboMaterial(body);
      } else {
        success = await updateComboMaterial(body);
      }

      if (success) {
        await refresh();
        toast.success("Registro salvo!");
      } else {
        toast.error("Ocorreu um erro ao salvar o registro!");
      }

      setError({});
    } catch (err) {
      let objError = {};
      err.errors.forEach((e) => {
        const [inputError, ...error] = e.split(" ");
        objError = { ...objError, [inputError]: error.join(" ") };
      });

      setError(objError);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Modal
      title={form.id_combo_cmb ? "Edição" : "Cadastro"}
      onClose={onClose}
      visible={visible}
    >
      <FormGroup>
        <label>Descrição</label>
        <Input
          type={"text"}
          defaultValue={form?.des_combo_cmb ?? ""}
          name="desc_combo_cmb"
          onChange={handleChangeValue}
          error={error?.des_combo_cmb ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Centro de Custo</label>
        <SelectBox
          options={formData?.centroCusto ?? []}
          defaultValue={form?.id_centro_custo_cmb ?? []}
          name="id_centro_custo_cmb"
          onChange={handleChangeValue}
          error={error?.id_centro_custo_cmb ?? false}
          limit={1}
        />
      </FormGroup>

      <FormGroup>
        <label>Valor</label>
        <Input
          placeholder="R$ 0,00"
          maxLength={16}
          value={form?.vlr_combo_cmb ?? ""}
          name="vlr_combo_cmb"
          onChange={handleChangeValue}
          error={error?.vlr_combo_cmb ?? false}
        />
      </FormGroup>

      <FormGroup>
        <label>Materiais</label>
        <SelectBox
          options={formData.materiais ?? []}
          defaultValue={form?.materiais ?? []}
          name="materiais"
          onChange={handleChangeValue}
          error={""}
        />
      </FormGroup>

      <ButtonSubmit handleSubmit={handleSubmit} loading={loadingSubmit}>
        Salvar
      </ButtonSubmit>
    </Modal>
  );
}
