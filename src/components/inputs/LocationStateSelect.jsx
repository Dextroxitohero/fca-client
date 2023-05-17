import Select from 'react-select';
import { estadosRepublicaMexico } from '../../static/data';

export const LocationStateSelect = ({ onChange }) => {
	const options = estadosRepublicaMexico.map((estado) => ({
		value: estado.name,
		label: estado.name
	}));

	const handleSelectChange = (selectedOption) => {
		console.log(selectedOption)
		onChange(selectedOption);
	};

	return (
		<Select
			options={options}
			onChange={handleSelectChange}
			placeholder={"Seleciona tu estado"}
			classNames={{
				control: () => 'p-2 border-2',
				input: () => 'text-lg',
				option: () => 'text-lg'
			}}
			theme={(theme) => ({
				...theme,
				borderRadius: 6,
				colors: {
					...theme.colors,
					primary: 'black',
					primary25: '#ffe4e6'
				}
			})}
		/>
	);
};

