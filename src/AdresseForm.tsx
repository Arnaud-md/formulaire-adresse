import { useState } from "react";
import { useCallback } from "react";

const AdresseForm = (props: { onAddressChange: (address: string) => void}) => {

    let [saisie, setSaisie] = useState("");
    const [possibilities, setPossibilities] = useState<string[]>([]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('new value', e.target.value)
        const update = async ()=> {
            if (e.target.value.length>3) {
                const reponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${e.target.value}`)
                const data = await reponse.json();
                console.log("reponse avant tableau: ",data);
                const addresses = data.features.map(
                    (feature: any) => feature.properties.label
                )
                setPossibilities(addresses)
            }
        }
        update();
        
        console.log('reponse', possibilities);
        setSaisie(e.target.value);
    }, [saisie])

    const handleListClick = useCallback((pos:number) => {
        if (pos >= 0) {
            props.onAddressChange(possibilities[pos]);
            setPossibilities([]);
        }
    },[])

    return (
        <div>
            <input onChange={handleChange} type="text"></input>
            <div>voici les adresses : {possibilities.map((possibility, position) => (
                <li
                    key={position}
                    className="possibility"
                    onClick={() => handleListClick(position)}
                >
                    {possibility}
                </li>
            ))}</div>
        </div>

    );
};

export default AdresseForm;