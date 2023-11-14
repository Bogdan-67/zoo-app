import * as Yup from 'yup';

const AnimalSchema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Название животного обязательно'),
  predator: Yup.boolean().required('Обязательное поле'),
});
export default AnimalSchema;
