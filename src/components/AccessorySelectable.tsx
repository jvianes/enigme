import { useCallback, type ChangeEvent } from "react";
import type { IAccessory } from "../interfaces/IAccessory";

interface IAccessoireSelectableProps {
  accessoire: IAccessory;
  onChange: (id: string, selected: boolean) => void;
}

export function AccessorySelectable(props: IAccessoireSelectableProps) {
  const { onChange } = props;

  const onChangePrivate = useCallback((event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    onChange(event.target.value, event.target.checked)
  }, [onChange]);
  return <label><input type="checkbox" name="ustensiles" value={props.accessoire.id} onChange={onChangePrivate}/> {props.accessoire.texte}</label>

}