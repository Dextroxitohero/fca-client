import { useSelector } from "react-redux"
import { ContainerFull } from "../../components/ContainerFull"
import { Heading } from "../../components/Heading"
import { PropertyItem } from "../../components/PropertyItem"
import { PropertyListItem } from "../../components/PropertyListItem"

export const ProfilePage = () => {

    // const {} = useSelector((state) => state)

    return (
        <ContainerFull>

            <Heading
                title={`Perfil de usuario`}
                subtitle={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit repellat facere obcaecati ab necessitatibus veniam sapiente iure expedita numquam qui.`}
                center={false}
            />

            <div className={`
                flex 
                items-center 
                justify-start
            `}>
                <div className={`
                    w-full 
                    md:w-4/12
                    md:mt-8
                    pt-12 
                    md:pt-0 
                `}>
                    <PropertyListItem>
                        <PropertyItem 
                            title={`Nombre completo`} 
                            description={`Eric Hernandez`} 
                        />
                        <PropertyItem 
                            title={`Nombre completo`} 
                            description={`Eric Hernandez`} 
                        />
                        <PropertyItem 
                            title={`Nombre completo`} 
                            description={`Eric Hernandez`} 
                        />
                        <PropertyItem 
                            title={`Nombre completo`} 
                            description={`Eric Hernandez`} 
                        />
                        <PropertyItem 
                            title={`Nombre completo`} 
                            description={`Eric Hernandez`} 
                        />
                        <PropertyItem 
                            title={`Acerde de ti`} 
                            description={`Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                            qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                            pariatur mollit ad adipisicing reprehenderit deserunt qui eu.`} 
                        />
                    </PropertyListItem>

                </div>
            </div>
        </ContainerFull>
    )
}
