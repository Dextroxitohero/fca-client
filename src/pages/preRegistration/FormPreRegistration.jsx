import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';




export const FormPreRegistration = () => {

	let bodyContent = (
		<div className="flex flex-col gap-8">
			{/* HEADING */}
			<div className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                "
			>
				<Heading
					title="Where do you wanna go?"
					subtitle="Find the perfect location!"
					center={true}
				/>
			</div>
			{/* BODY*/}
			<div className="relative p-6 flex-auto">
				<Heading
					title="Where do you wanna go?"
					subtitle="Find the perfect location!"
				/>
			</div>
			{/* FOOTER */}
			<div className="flex flex-col gap-2 p-6">
				<div
					className="
						flex 
						flex-row 
						items-center 
						gap-4 
						w-full
					"
				>
					<Button

						disabled={false}
						label={"Atras"}
						outline
						onClick={() => { }}
					/>
					<Button

						disabled={false}
						label={"Siguiente"}
						onClick={() => { }}
					/>
				</div>
			</div>
		</div>
	)

	return (
		<div className="flex items-center justify-center h-screen bg-slate-50">
			<div className="w-full sm:w-w-2xl max-w-2xl h-3/4 shadow-md bg-white rounded-xl">
				{bodyContent}
			</div>
		</div>
	)
}
