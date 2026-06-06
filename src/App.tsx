import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { AccessorySelectable } from './components/AccessorySelectable'
import { PhraseDialog } from './components/PhraseDialog';


// function shuffle<T>(arr: T[]) {
//   const newArr = [...arr];
//   // Source - https://stackoverflow.com/a/2450976
// // Posted by ChristopheD, modified by community. See post 'Timeline' for change history
// // Retrieved 2026-06-06, License - CC BY-SA 4.0

//   let currentIndex = newArr.length;

//   // While there remain elements to shuffle...
//   while (currentIndex != 0) {

//     // Pick a remaining element...
//     let randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [newArr[currentIndex], arr[randomIndex]] = [
//       newArr[randomIndex], arr[currentIndex]];
//   }
  
//   return newArr;
// }

function App() {

  const [selectedAccessories, setSelectedAccessories] = useState<Set<string>>(new Set<string>());

  const allAccessories = [
        {id:"casquette", texte:"🧢 Casquette"},
        {id:"chapeau", texte:"🎩 Chapeau"},
        {id:"manteau", texte:"🧥 Manteau"},
        {id:"lunettes", texte:"👓 Lunettes de vue"},
        {id:"poudre", texte:"☝️ Poudre à empreintes"},
        {id:"carnet", texte:"🗒️ Carnet"},
        {id:"chaussures", texte:"👞 Chaussures"},
        {id:"robe", texte:"👗 Robe"},
        {id:"stylo", texte:"🖊️ Stylo"},
        {id:"fleurs", texte:"🌹 Fleurs"},
        {id:"sac_a_main", texte:"👜 Sac à main"},
        {id:"lunettes_soleil", texte:"🕶️ Lunettes de soleil"},
        {id:"soleil", texte:"☀️ Soleil"},
        {id:"bonbons", texte:"🍬 Bonbons"},
        {id:"verre_de_vin", texte:"🍷 Verre de vin"},
        {id:"loupe", texte:"🔍 Loupe"},
        {id:"velo", texte:"🚲 Vélo"},
        {id:"trompette", texte:"🎺 Trompette"},
  ];
  
  const accessories = allAccessories;//shuffle(allAccessories);

  const winningAccessories = new Set([
    "chapeau",
    "lunettes_soleil",
    "loupe",
    "stylo",
    "carnet",
    "manteau",
    "poudre",
    "chaussures",
  ]);

  const phrase = "Demandez à la plus petite. Elle a trouvé et caché un indice appartenant au coupable.";

  const onChange = useCallback((id: string, selected: boolean) => {
    const newSelection = new Set(selectedAccessories);
    if (selected) {
      newSelection.add(id);
    } else {
      newSelection.delete(id);
    }
    setSelectedAccessories(newSelection);
  }, [selectedAccessories]);

  const win = useMemo(() => {
    const sizeOk = selectedAccessories.size === winningAccessories.size;
    const difference = selectedAccessories.symmetricDifference(winningAccessories);
    return sizeOk && difference.size === 0;
  }, [selectedAccessories]);

  return (
    <div className="wrapper">
      <section id="left">
        <h2>Accessoires détective</h2>
        { accessories.map((a) => AccessorySelectable({ accessoire: a, onChange: onChange })) }
      </section>
      {win && <PhraseDialog><div className='winning'>{phrase}</div></PhraseDialog>}
    </div>
  )
}

export default App
