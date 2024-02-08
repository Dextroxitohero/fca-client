import { ContainerFull } from "../../components/ContainerFull"
import { Heading } from "../../components/Heading"
import { Wrapper } from "../../components/Wrapper"
import { SettingDataModules } from "./SettingDataModules"

export const SettingPage = () => {
	return (
		<ContainerFull>
			<Heading
				title={'Configuracion de la aplicacion'}
				center={false}
			/>
			<div className="w-full flex flex-col lg:flex-row gap-4">
				<div className='w-full lg:w-[40%]'>
					<Wrapper>
						<SettingDataModules />
					</Wrapper>
				</div>
			</div>
		</ContainerFull>
	)
}
