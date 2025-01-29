import ParamEditor from '../../components/ParamEditor';
import { Param, Model } from '../../components/ParamEditor';
const params : Param[] = [
  {
    "id": 1,
    "name": "Назначение",
  },
  {
    "id": 2,
    "name": "Длина"
  },
];

const model : Model = {
  "paramValues": [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    },
  ],
};


export default function Home() {
  return (
    <div>
      <ParamEditor params={params} model={model}/>
    </div>
  );
}
