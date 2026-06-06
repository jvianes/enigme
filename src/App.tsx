import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { AccessorySelectable } from './components/AccessorySelectable'
import { PhraseDialog } from './components/PhraseDialog';




function App() {

  const [selectedAccessories, setSelectedAccessories] = useState<Set<string>>(new Set<string>());


  const accessories = [
    {id:"casquette", texte: "Casquette" },
    {id:"chapeau", texte: "Chapeau" }
  ];

  const winningAccessories = new Set([
    "chapeau"
  ]);

  const phrase = "Demandez à la plus petite. Elle a trouvé et caché un indice appartenant au coupable.";

  const onChange = useCallback((id: string, selected: boolean) => {
    console.log(id, selected);
    const newSelection = new Set(selectedAccessories);
    if (selected) {
      newSelection.add(id);
    } else {
      newSelection.delete(id);
    }
    setSelectedAccessories(newSelection);
  }, [selectedAccessories]);

  const win = useMemo(() => {
    console.log("compute win state");
    const sizeOk = selectedAccessories.size === winningAccessories.size;
    const difference = selectedAccessories.symmetricDifference(winningAccessories);
    console.log('winning state', 'sameSize=', sizeOk, 'difference=', difference, 'selected=', selectedAccessories);
    return sizeOk && difference.size === 0;
  }, [selectedAccessories]);

  return (
    <div className="wrapper">
      <section id="left">
        <h2>Accessoires</h2>
        { accessories.map((a) => AccessorySelectable({ accessoire: a, onChange: onChange })) }
        <label><input type="checkbox" name="ustensiles" value="casquette"/> 🧢 Casquette</label>
        <label><input type="checkbox" name="ustensiles" value="chapeau"/> 🎩 Chapeau</label>
        <label><input type="checkbox" name="ustensiles" value="lunettes_soleil"/> 🕶️ Lunettes de soleil</label>
        <label><input type="checkbox" name="ustensiles" value="lunettes"/> 👓 Lunettes de vue</label>
        <label><input type="checkbox" name="ustensiles" value="loupe"/> 🔍 Loupe</label>
        <label><input type="checkbox" name="ustensiles" value="poudre"/> ☝️ Poudre à empreintes</label>
        <label><input type="checkbox" name="ustensiles" value="stylo"/> 🖊️ Stylo</label>
        <label><input type="checkbox" name="ustensiles" value="carnet"/> 🗒️ Carnet</label>
        pipe
        manteau
        chaussures
        robe
        fleurs
        sac à main
        soleil
        bonbons
        verre de vin
        vélo
        trompette
      </section>
      {win && <PhraseDialog text={phrase}/>}
    </div>
  )
}

export default App
